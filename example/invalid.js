const hocon = require('../dist').hocon;

hocon().then((Hocon) => {
    const cfgStr = '[1,2,3,,]';
    console.log("=== the input config is: ===");
    console.log(cfgStr);
    const cfg = new Hocon.Config(cfgStr);
    console.log("=== the HOCON rendered result is: ===")
    console.log(cfg.toHOCON());
    console.log("=== the JSON rendered result is: ===")
    console.log(cfg.toJSON());
    cfg.delete();
}).catch(e => console.log(e));