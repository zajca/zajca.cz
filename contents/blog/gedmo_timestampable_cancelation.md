---
name: 'gedmo_timestampable_cancelation'
author: Martin Zajíc
title: How to disable Timestampable entity field easy and generic way
year: 7 January 2019
color: '#8e7964'
id: 'gedmo-timestampable-cancelation'
tags: [Symfony, Doctrine, Timestampable]
description: |
  Easy way how to cancel Timestampable entity from autoupdate field with interface and listener 
---

How to disable Timestampable field is often problem when we want to import/synchronize data to our database. Since most of the time this is a one time thing people tend to awful solutions (If you take at stackoverflow question below, you will find one solution which is directly changing db value with raw SQL and solution which will cancel timestampable on whole event without any control over it). In this blog post I will show you how to do it in more generic way with one Interface and one Listener and we will be able to cancel for each entity.  

<alert>This post is based on my answer on [stackoverflow](https://stackoverflow.com/a/53666915/1269774) </alert>

First thing we need to know is how this Timestampable magic works. And answer is simple one, there is [TimestampableListener](https://github.com/Atlantic18/DoctrineExtensions/blob/v2.4.x/lib/Gedmo/Timestampable/TimestampableListener.php) which will attach on <i-c>onFlush</i-c> and <i-c>prePersist</i-c> doctrine event. Important code which we are looking for is in class [AbstractTrackingListener::updateField](https://github.com/Atlantic18/DoctrineExtensions/blob/v2.4.x/lib/Gedmo/AbstractTrackingListener.php#L203-L227). This is what we will override to make canceling work.

We will simplify this a bit and remove reference object update and property notification (since I'm not using Notify ChangeTracking and avoiding reference update).

Here is our event, we simply check if <i-c>TimestampableCancelInterface</i-c> is implemented and if event for entity was canceled.
```php
class TimestampableListener extends \Gedmo\Timestampable\TimestampableListener
{
    /**
     * @param object               $object
     * @param TimestampableAdapter $eventAdapter
     * @param ClassMetadata        $meta
     * @param string               $field
     */
    protected function updateField($object, $eventAdapter, $meta, $field)
    {
        /** @var \Doctrine\Orm\Mapping\ClassMetadata $meta */
        $property = $meta->getReflectionProperty($field);
        $newValue = $this->getFieldValue($meta, $field, $eventAdapter);
        
        if (!$this->isTimestampableCanceled($object)) {
            $property->setValue($object, $newValue);
        }
    }
    
    private function isTimestampableCanceled($object): bool
    {
        if(!$object instanceof TimestampableCancelInterface){
            return false;
        }
        
        return $object->isTimestampableCanceled();
    }

}
```

Our <i-c>TimestampableCancelInterface</i-c> is really simple:

```php
interface TimestampableCancelInterface
{

   public function isTimestampableCanceled(): bool;

}
```

Implementation is now simple, we will create trait for this, which will just set property <i-c>isTimestampableCanceled</i-c>.

```php
trait CancelTimestampableTrait
{
    private $isTimestampableCanceled = false;
    
    public function cancelTimestampable(bool $cancel = true): void
    {
        $this->isTimestampableCanceled = $cancel;
    }
    
    public function isTimestampableCanceled():bool {
        return $this->isTimestampableCanceled;
    }
}
```

Our entity now can looks like this:

```php
class FooEntity implements TimestampableCancelInterface
{
    
    use TimestampableEntityTrait;
    use CancelTimestampableTrait;
}
```

Last this we need is to replace original listener (I'm using symfony and DoctrineExtensionsBundle):

```yaml
stof_doctrine_extensions:
    orm:
        default:
            timestampable: true
    class:
      timestampable:  <Namespace>\TimestampableListener
```

We are now finished and can cancel <i-c>Timestampable</i-c> for each entity with simple method: 

```php
$entity = new Entity;
$entity->cancelTimestampable(true)
$em->persist($entity);
$em->flush(); // here you will get constraint violation since createdAt is not null :D
```
