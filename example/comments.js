const hocon = require('../dist').hocon;

hocon().then((Hocon) => {
    const cfgStr = '// a later definition referring to an earlier\n// (see "self-referential substitutions" below)\na : [ 1, 2 ]\na : ${a} [ 3, 4 ]';
    console.log("=== the input config is: ===");
    console.log(cfgStr);
    const cfg = new Hocon.Config(cfgStr);
    cfg.setRenderComments(true);
    console.log("=== the HOCON rendered result is: ===")
    console.log(cfg.toHOCON());
    console.log("=== the JSON rendered result is: ===")
    console.log(cfg.toJSON());
    cfg.delete();
});