declare module "safe-expression" {
    export = $ParseProvider;
    declare function $ParseProvider(): (exp: string, interceptorFn?: any) => (context?: object) => number;
}