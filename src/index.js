import config from './config';



var hocon = (function() {
    class Config {
        constructor(text) {
            this.wrapped = new Config.WrappedCls(text)
        }

        setRenderComments(val) { this.wrapped.setRenderComments(val); }
        setRenderOriginComments(val) { this.wrapped.setRenderOriginComments(val); };
        setRenderFormatted(val) { this.wrapped.setRenderFormatted(val); };
        delete() { this.wrapped.delete(); };

        // overrides
        toJSON() {
            return this.outputf(this.wrapped.toJSON());   
        }
        toHOCON() {
            return this.outputf(this.wrapped.toHOCON());
        }

        // private
        outputf(text) {
            if (text.startsWith("RESULT\n")) {
                return text.substring(7);
            } else if (text.startsWith("ERROR\n")) {
                throw new Error(text.substring(6));
            }
            throw new Error(text);
        }
    }

    return (function() {
        return config().then((cfg) => {
            Config.WrappedCls = cfg.Config;
            return {Config: Config};
        });
    });

})();

export default hocon;