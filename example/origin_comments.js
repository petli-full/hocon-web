const hocon = require('../dist').hocon;

hocon().then((Hocon) => {
    const cfgStr = 'foo : { a : { c : 1 } }\nfoo : ${foo.a}\nfoo : { a : 2 }';
    console.log("=== the input config is: ===");
    console.log(cfgStr);
    const cfg = new Hocon.Config(cfgStr);
    cfg.setRenderOriginComments(true);
    console.log("=== the HOCON rendered result is: ===")
    console.log(cfg.toHOCON());
    console.log("=== the JSON rendered result is: ===")
    console.log(cfg.toJSON());
    cfg.delete();
});