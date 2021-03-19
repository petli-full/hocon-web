const hocon = require('../dist').hocon;

hocon().then((Hocon) => {
    const cfgStr = '{\n  "foo" : { "a" : 29.1.1 },\n  1.2.3 : { "b" : 43 }\n}';
    console.log("=== the input config is: ===");
    console.log(cfgStr);
    const cfg = new Hocon.Config(cfgStr);
    cfg.setRenderFormatted(true);
    console.log("=== the HOCON rendered result is: ===")
    console.log(cfg.toHOCON());
    console.log("=== the JSON rendered result is: ===")
    console.log(cfg.toJSON());
    cfg.delete();
});