const hocon = require('../dist').hocon;

// This is an example for using hocon-web with nodejs
hocon().then((Hocon) => {
    const cfgStr = "settings.title.font: 20\nsettings.title.style: {\n  color : red\n  transform : {\n    x: x100\n  }\n}\nsettings.title.style { transform { y=y200 } }\nsettings.main_color: ${settings.title.style.color}\nitems: [apple, 2, 3, {banana: large}]\naddress {city: denvor}\nposition : ${address.city}";
    console.log("=== the input config is: ===");
    console.log(cfgStr);
    const cfg = new Hocon.Config(cfgStr);
    console.log("=== the HOCON rendered result is: ===")
    console.log(cfg.toHOCON());
    console.log("=== the JSON rendered result is: ===")
    console.log(cfg.toJSON());
    cfg.delete();
});