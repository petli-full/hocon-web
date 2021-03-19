# hocon-web

This is a javascript HOCON parser. It was created by compiling the [cpp-hocon](https://github.com/puppetlabs/cpp-hocon) library using [emscripten](https://emscripten.org/) compiler.
It is a standalone library and can be built into applications run in Nodejs or browsers.


### install it

```
npm install --save hocon-web
```

### run it in nodejs

```
const hocon = require('hocon-web').hocon;

hocon().then((instance) => {
    const cfg = new instance.Config('a=b');
    // output in HOCON format
    console.log(cfg.toHOCON());
    // output in JSON format
    console.log(cfg.toJSON());
    // remmber to delete to avoid of memory leaks
    cfg.delete();
});
```

### use import

```
import { hocon } from 'hocon-web;

hocon().then((instance) => {
    const cfg = new instance.Config('a=b');
    console.log(cfg.toJSON());
    cfg.delete();
});
```

### examples

More examples can be found in [example](https://github.com/petli-full/hocon-web/tree/master/example)


### APIs

Currently, the library only exposes very simple "high-level" methods for easily parsing a string into HOCON or JSON text. It can be extended to expose the original API methods from [cpp-hocon](https://github.com/puppetlabs/cpp-hocon) library.

Here're all the methods the library provides,
```
// require the library
const hocon = require('hocon-web').hocon;

// import the library
import { hocon } from 'hocon-web;

// get the instance: an emscripten [module object](https://emscripten.org/docs/api_reference/module.html)
hocon().then((instance) => {
    
    // create a Config object which takes a JSON/HOCON text as the input
    const cfg = new instance.Config('a=b');

    // whether to render comments in the resolved string
    setRenderComments(true);
    
    // whether to render the comments internally generated and used by the parser (no actual use for most apps)
    setRenderOriginComments(true);

    // whether to render spaces, indentation, and new lines
    setRenderFormatted(true);

    // resolve the input to JSON text
    const jsonText = cfg.toJSON());

    // resolve the input to HOCON text
    const hoconText = cfg.toHOCON();

    // delete the Config object to prevent memory leaks
    cfg.delete();
});
```


### limitations
Include (files, URLs, and classpath) does not work. They are resolved to empty string.

### contributions
Welcome to contribute to this library by sending PR's or creating issues.
