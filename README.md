# Element Stick

Do you find css sticky position annoying? If yes we are on the same boat, this small package will programically add sticky functionality through plain javascript to your desired element.

## USAGE

```js

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
"top" 
``` 

### offset

If we do not want element to stick exactly on screen end in given direction we can set an offset in pixels.  
Default: 
```js 
0 
``` 

### viewport

sometimes we do not want the element to stick on devices with lower resosution, viewport is the least ammount of pixels of width that trigger sticky behaviour. If the viewer width is lees then given number, element will not stick.  
Default: 
```js 
0 
``` 

### keepWidth

If we need the element to keep exact width after sticking set it to true.  
Default: 
```js 
true 
```

### keepHeight

If we need the element to keep exact height after sticking set it to true.  
Default: 
```js 
true 
```

## TESTING

```console
npm run test
```
