---
name: 'param_converter_forms'
author: Martin Zajíc
title: How to use ParamConverter for forms handling
year: 17 May 2019
color: '#8e7964'
id: 'param-converter-forms'
tags: [Symfony, ParamConverter]
description: |
  How to use ParamConverter to simplify general use of symfony forms 
---

Param converter is great tool to easy symfony developement, in most cases developer using only Doctrine converter which is described in documentation. But it's use is much wider. In this post I'll show you how to handle forms and make controller much more simple.

<alert>Documentation to ParamConverter can be found at [Symfony docs](https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html) </alert>

<alert type="warning">Disclaimer: In this blog post I'm using form in REST api, so I don't care about rendering in template, but template can be passed in options, with just few changes.</alert>

This is most general use of forms in symfony. FormType is created with value object, user request is handled, form is validated and some response is returned.
```php
public function someAction(Request $request, FormFactioryInterface $formFactory){
        $form = $formFactory->create(
            FormType::class,
            new FormDTO::class,
            ['method' => 'POST']
        );

    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        
        // get DTO object
        /** @var FormDTO $task */
        $task = $form->getData();

        // do something
      
        return // success
    }

    return // fail
}
```
This is boring to do and we could do better with ParamConverter. And final form handling can look like this:

```php
/**
 * @Route("/post-my-form", methods={"POST"})
 * @ParamConverter(name="form", class=FormType::class, options={"data":FormDTO::class})
 */
final class SetEmailForTestAction
{
    public function __invoke(FormInterface $form): View {
         /** @var FormDTO $task */
        $task = $form->getData();
    }
}
```
First we need to implement ParamConverterInterface

```php
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpFoundation\Request;

class FormParamConverter implements ParamConverterInterface
{
    private const DEFAULT_HTTP_METHOD = 'POST';
    /**
     * @var FormFactoryInterface
     */
    private $formFactory;

    public function __construct(FormFactoryInterface $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function apply(Request $request, ParamConverter $configuration): bool
    {
       //...
    }

    /**
     * {@inheritdoc}
     */
    public function supports(ParamConverter $configuration): bool
    {
        // ...
    }
}
```

We have to check if FormTypeInterface is present in Action parameters with `supports` method. 
```php
public function supports(ParamConverter $configuration): bool
{
  /** @var string|null $class */
  $class = $configuration->getClass();
  if (null === $class) {
      return false;
  }
  
  $ref = new \ReflectionClass($class);
  
  if ($ref->implementsInterface(FormTypeInterface::class)) {
      return true;
  }
  
  return false;
}
```

Now handle our form:
```php
public function apply(Request $request, ParamConverter $configuration): bool
{
    /** @var string $formClass */
    $formClass = $configuration->getClass();
    if (!\array_key_exists('data', $configuration->getOptions())) {
        throw new \Exception('DTO class must be specified please set data option.');
    }
    /** @var string $formClass */
    $dataClass = $configuration->getOptions()['data'];
    
    // set default method
    $method = self::DEFAULT_HTTP_METHOD;
    if (\array_key_exists('method', $configuration->getOptions())) {
        // change method if options are different
        $method = $configuration->getOptions()['method'];
    }

    $form = $this->formFactory->create(
        $formClass,
        new $dataClass(),
        ['method' => $method]
    );

    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        // set form as action attribute
        $request->attributes->set($configuration->getName(), $form);
    } else {
        throw new UnprocessableFormHttpException($form);
    }

    return true;
}
```
We can se that we just check ParamConverter Annotation options, paste code from action here and in the end set out valid form as action attribute.

Only one missing thing `UnprocessableFormHttpException` which is thrown if form is not valid. This can be checked in `onKernelException` event, and errors can be serialized for api.
 
```php
class UnprocessableFormHttpException extends HttpException
{
    /**
     * @var FormInterface
     */
    private $form;

    public function __construct(FormInterface $form, \Exception $previous = null, int $code = 0, array $headers = [])
    {
        parent::__construct(Response::HTTP_UNPROCESSABLE_ENTITY, 'Form is not valid', $previous, $headers, $code);
        $this->form = $form;
    }

    public function getForm(): FormInterface
    {
        return $this->form;
    }
}
```
And we are done. Simple and our controller can be bit cleaner. 
