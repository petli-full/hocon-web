#include <emscripten/bind.h>
#include <hocon/config.hpp>
#include <hocon/types.hpp>
#include <hocon/config_render_options.hpp>

using namespace emscripten;
using hocon::config;
using hocon::shared_config;
using hocon::config_render_options;

class Config {
    public:
    Config(std::string config_str) : config_str(config_str) {
        error_str = "";
        option = config_render_options::concise();

        try {
            cfg = config::parse_string(config_str)->resolve();
        } catch (const std::exception& ex) {
            error_str = ex.what();
        } catch (...) {
            error_str = "failed to parse input";
        }
    }

    std::string toJSON() {
        if (error_str != "") { return errorf(error_str); }

        try {
            return resultf(cfg->root()->render(option));
        } catch (const std::exception& ex) {
            return errorf(ex.what());
        } catch(...) {
            return errorf("failed to render JSON");
        }
    }

    std::string toHOCON() {
        if (error_str != "") { return errorf(error_str); }

        try {
            return resultf(cfg->root()->render(option.set_json(false)));
        } catch (const std::exception& ex) {
            return errorf(ex.what());
        } catch(...) {
            return errorf("failed to render HOCON");
        }
    }

    void setRenderComments(bool val) {
        option = option.set_comments(val);
    }

    void setRenderOriginComments(bool val) {
        option = option.set_origin_comments(val);
    }

    void setRenderFormatted(bool val) {
        option = option.set_formatted(val);
    }

    private:
    std::string config_str;
    shared_config cfg;
    std::string error_str;
    config_render_options option;
    std::string errorf(std::string text) {
        return "ERROR\n" + text;
    }
    std::string resultf(std::string text) {
        return "RESULT\n" + text;
    }
};

EMSCRIPTEN_BINDINGS(hocon_config_wrapper) {
    class_<Config>("Config")
        .constructor<std::string>()
        .function("toJSON", &Config::toJSON)
        .function("toHOCON", &Config::toHOCON)
        .function("setRenderComments", &Config::setRenderComments)
        .function("setRenderOriginComments", &Config::setRenderOriginComments)
        .function("setRenderFormatted", &Config::setRenderFormatted);
}
