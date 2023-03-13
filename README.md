# STICKJS

Do you find css sticky position annoying? If yes we are on the same boat, this small package will programically add sticky functionality through plain javascript to your desired element and even a little bit more.

## USAGE

Intstall as an npm package

```shell
npm install @schptr/stickjs
```

Import the functions that you need

```js
import { isSticky } from "@schptr/stickjs";
```

Import css

```js
import "@schptr/stickjs/src/stick.css";
```

or add snipet below to your css files

```css
.is-sticky {
  position: fixed;
  top: var(--offsetTOP);
  left: var(--offsetLEFT);
  right: var(--offsetRIGHT);
  bottom: var(--offsetBOTTOM);
}
```

## Options

```js
{
    direction: "top",
    offset: 0,
    viewport: 0,
    keepWidth: true,
    keepHeight: true,
}
```

### direction

direction in which element will stick - "top", "bottom", "left", "right".  
Default:

```js
"top";
```

### offset

If we do not want element to stick exactly on screen end in given direction we can set an offset in pixels.  
Default:

```js
0;
```

### viewport

sometimes we do not want the element to stick on devices with lower resosution, viewport is the least ammount of pixels of width that trigger sticky behaviour. If the viewer width is lees then given number, element will not stick.  
Default:

```js
0;
```

### keepWidth

If we need the element to keep exact width after sticking set it to true.  
Default:

```js
true;
```

### keepHeight

If we need the element to keep exact height after sticking set it to true.  
Default:

```js
true;
```

## Functions

## Browser compatibility

Stickjs is supported by all of the modern browsers. The least compatible think stickjsy uses are css variables that are widely supported, [more on that topic here](https://caniuse.com/css-variables)

## TESTING

```console
npm run test
```
