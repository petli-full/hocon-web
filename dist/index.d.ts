declare module "hocon-web" {
    interface ConfigConstructable {
        new(text: string): Config;
    }

    interface Config {
        toJSON(): string;
        toHOCON(): string;
        setRenderComments(val: Boolean): void;
        setRenderOriginComments(val: Boolean): void;
        setRenderFormatted(val: Boolean): void;
        delete(): void;
    }

    export function hocon(overrides?: Object): Promise<{Config: ConfigConstructable }>;
}