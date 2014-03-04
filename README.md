# jquery-parallax.js

[![License](https://poser.pugx.org/leaphly/cart-bundle/license.png)](https://packagist.org/packages/leaphly/cart-bundle)

Simple **heavily costumizable** Parallax plugin that creates the desired effect by animating the element background-position. 

By avoiding translated animations, lowers the system requirements to obtain smooth and nice results.

## Author

Víctor Ortega: [vxc.es][website]

## License

licensed under the [MIT][mit] and [GPL][gpl] licenses

## Setup

Simply create any html tag and give it a **background-image**.

```html
<div class="elementWithTheBgIWantToMove"></div>
```

This jquery-parallax plugin needs [jquery][jquery] to function, obvisouly. Said that, to enable the parallax effect just call the parallax method into the jquery object selector. Multiple items matching the selector would get the same effect on each element.

```javascript
$('.elementWithTheBgIWantToMove').parallax();
```

Voila!

## Config values

There are a number of config values that you can setup for any **jquery-parallax**
call. 

| Name         	   | Values             	            | Default value | Description                                                                              |
| ---------------- | -------------------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `TransitionType` | `vertical`, `horizontal`, `diagonal`   | `vertical`    | The animation type 								       |
| `speed` 	   | `-1` to `1`			    | `0.5`	    | Speed of the animation. Using positive or negative values change the animation direction |
| `outerHeight`    | `true` or `false`     		    | `true`        | Wether to get the full height of the element, including padding, or not.                 |


### Configuration example

```javascript
$('.elementWithTheBgIWantToMove').parallax({
	transitionType: 'horizontal',
	speed: -0.3,
	outerHeight: false,
});
```

[website]: http://vxc.es
[mit]: http://www.opensource.org/licenses/mit-license.php
[jquery]: http://jquery.com/
[gpl]: http://www.gnu.org/licenses/gpl.html

