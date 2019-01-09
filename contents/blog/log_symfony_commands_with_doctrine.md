---
name: 'log_symfony_commands_with_doctrine'
author: Martin Zajíc
title: How to log symfony commmand output to database
year: 7 January 2019
color: '#8e7964'
id: 'log-symfony-commands-with-doctrine'
tags: [Symfony, Doctrine, CLI, Command, PSR]
description: |
  Will show how to log all command output both to tty and to database  
---

In this blog post will show you how to log messages from your commands to database with doctrine using PSR LoggerInterface.

<alert>We will be using PSR logger and saving all records at once using ORM, this can have high memory footprint with lots of messages. Also we will only save text messages not context information.</alert>


Usually <i-c>OutputInterface</i-c> is used to write text to tty. But lot of commands are used in cron jobs for example and it's handy to know if job was successful and if not what was wrong. Yes there are more options like monolog, APM,… which can do this. But I will show you how to do it without dependency using code from <i-c>Symfony\Component\Console\Logger\ConsoleLogger</i-c>. 

First we will copy paste (kill me now) all code from <i-c>Symfony\Component\Console\Logger\ConsoleLogger</i-c> to own class named <i-c>ORMCommandLogger</i-c>. Most of the properties and methods in <i-c>ConsoleLogger</i-c> are private so we can't extend it.

Here are changes that we will make in ConsoleLogger:

1. Inject extra EntityManagerInterface (hope you don't need to show code for this :D)
2. Introduce property <i-c>$messageStack</i-c> here we will keep messages till flush
```php
    /** @var array|string[] */
    private $messageStack = [];
```
3. add two new methods <i-c>initRecord</i-c> and <i-c>closeRecord</i-c>

```php
    public function initRecord($commandName): void
    {
        $commandEntity = new CommandLog($commandName);
        $this->entityManager->persist($commandEntity);
        $this->entityManager->flush();
        // only id is saved as commands often call entity manager clear
        $this->commandEntityId = $commandEntity->getId();
    }
    
    public function closeRecord(int $exitCode): void
    {
        /** @var CommandLog $commandEntity */
        $commandEntity = $this->entityManager->find(CommandLog::class, $this->commandEntityId);
        $commandEntity->closeLog($exitCode, $this->messageStack);
        $this->entityManager->persist($commandEntity);
        $this->entityManager->flush();
    }
```

4. We would also like to save everything but info and debug level of command so we will redeclare <i-c>$verbosityLevelMap</i-c>
```php
    private $verbosityLevelMap = [
        LogLevel::EMERGENCY => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::ALERT     => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::CRITICAL  => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::ERROR     => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::WARNING   => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::NOTICE    => OutputInterface::VERBOSITY_NORMAL,
        LogLevel::INFO      => OutputInterface::VERBOSITY_VERBOSE,
        LogLevel::DEBUG     => OutputInterface::VERBOSITY_DEBUG,
    ];
```

we can't flush on every message since this could easy have huge side effects on our application :) But using different storage like TSDB (Time Series Database) database or saving messages to cache is also possible.

Next is our entity which is called <i-c>CommandLog</i-c>

```php
/**
 * @ORM\Table(name="log_command")
 * @ORM\Entity()
 */
class CommandLog extends BaseEntity
{
    
    use TimestampableEntityTrait;
    
    /**
     * @var string
     * @Serializer\Groups({"title","title:read","admin"})
     * @ORM\Column(name="title", type="text")
     */
    private $title;
    
    /**
     * @var array|string[]
     * @ORM\Column(type="json_array",nullable=true)
     */
    protected $logStack;
    
    /**
     * @var int
     * @ORM\Column(type="integer",nullable=true)
     */
    protected $exitCode;
    
    public function __construct(string $title)
    {
        $this->title = $title;
    }
    
    public function closeLog(int $exitCode, array $logStack): void
    {
        $this->logStack = $logStack;
        $this->exitCode = $exitCode;
    }
    
    public function getExitCode(): int
    {
        return $this->exitCode;
    }
    
    public function getTitle(): string
    {
        return $this->title;
    }

    
    public function getLogStack(): array
    {
        return $this->logStack;
    }
}
```

Entity using <i-c>TimestampableEntityTrait</i-c> from DoctrineExtensions. Also we don't need time when command ended since it's updatedAt from this trait.

Now we can introduce new abstract class which all our command will extend. 


```php
abstract class AbstractLoggedCommand extends Command
{
    
    /** @var InputInterface */
    protected $input;
    
    /** @var OutputInterface */
    protected $output;
    
    /** @var EntityManagerInterface */
    private $entityManager;
    
    /** @var ORMCommandLogger */
    protected $logger;
    
    /**
     * @required
     */
    public function setEntityManager(EntityManagerInterface $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * {@inheritdoc}
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // I'm lazy to use all the time output as argument for functions for progress co save it to this
        // (this is not needed)
        $this->input = $input;
        $this->output = $output;
        
        // create logger instance
        $this->logger = new ORMCommandLogger($output, $this->entityManager);
        // init database record
        $this->logger->initRecord($this->getName());
        
        try {
            $exitCode = $this->executeCommand($input, $output);
            $this->logger->notice('Command done: status code: ' . $exitCode);
            $this->logger->closeRecord($exitCode);
            return $exitCode;
        } catch (\Exception $e) {
            $this->logger->critical('Command done: error: ' . $e->getMessage());
            $this->logger->closeRecord(1);
            throw $e;
        }
    }
    
    /**
     * Executes the current command.
     *
     * @return int|null null or 0 if everything went fine, or an error code
     *
     * @throws LogicException When this abstract method is not implemented
     *
     * @see setCode()
     */
    protected function executeCommand(InputInterface $input, OutputInterface $output): int
    {
        throw new LogicException('You must override the executeCommand() method in the concrete command class.');
    }
}
```

As we can see our command need to change a bit, instead of using <i-c>execute</i-c> method we introduced new method <i-c>executeCommand</i-c> which we need to use in all our commands instead of <i-c>execute</i-c>. I also like to enforce status code from commands so execute command has return type <i-c>int</i-c> but you don't need this.

Last this we need to do is to change our commands code, first extend <i-c>AbstractLoggedCommand</i-c> and use <i-c>executeCommand</i-c> instead of <i-c>execute</i-c> and next instead of <i-c>$output->writeln('msg')</i-c> use <i-c>$this->logger->{emergency,alert,critical,error,warning,notice,info,debug}('msg')</i-c>

Now our command has all the time record in database with all messages and return code.
