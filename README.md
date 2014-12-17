Probe.js
========

Stop being blind about what is happening on the screen. Place probe inside your DOM and do whatever you want when they are activated ;)

Use cases
=======

With probe.js you can, for example :

- track an analytics event when your user reach the bottom of the page;
- lazy load something on the page that is not visible on load (Disqus comments would be a good example);
- change the state of a sticky header, footer, ...

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
    onTopHitBottom: function (isVisible) {
        ga('send', 'event', 'comments', 'view-comments-section');
    }
});
```

Events reference
=======

here is the configuration object you can pass to the constructor of a probe

```javascript
{
    onTopHitTop: function () {}, //when the top border of the element hits the top of the screen
    onBottomHitTop: function () {}, //when the bottom border of the element hits the top of the screen
    onTopHitBottom: function () {}, //when the top border of the element hits the bottom of the screen
    onBottomHitBottom: function () {}, //when the bottom border of the element hits the bottom of the screen
}
```
