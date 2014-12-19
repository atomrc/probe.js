Probe.js
========

Stop being blind about what is happening on the screen. Place probe inside your DOM and do whatever you want when they are activated ;)

Use cases
=======

With probe.js you can, for example :

- track an analytics event when your user reach the bottom of the page;
- lazy load something on the page that is not visible on load (Disqus comments would be a good example);
- change the state of a sticky header, footer;
- ...

Install
=======
You can download it from the `dist` folder of this repo

Usage
=====

Simply add this in your main html file

```html
<script src="/path/to/probe.js"></script>
```

then transform some element of your DOM into a probe : 

```javascript
var element = document.getElementById("probe");
probe(element, {
    onAppearStart: function () {
        ga('send', 'event', 'comments', 'view-comments-section');
    }
});
```

You can prevent a specific event to be triggered after it has been triggered once (or more) by returning `false` in the callback. For example this piece of code will only be fired once :

```javascript
var element = document.getElementById("probe");
probe(element, {
    onAppearStart: function () {
        ga('send', 'event', 'comments', 'view-comments-section');

        return false; //will prevent probe.js from calling that callback latter
    }
});
```

Events reference
=======

here is the configuration object you can pass to the constructor of a probe

```javascript
{
    onAppearStart: function () {}, //when the element starts appearing on the screen
    onAppearEnd: function () {}, //when the element has completly appeared on the screen
    onDisappearStart: function () {}, //when the element starts disappearing from the screen
    onDisappearEnd: function () {}, //when the element has disappeared from the screen
}
```
