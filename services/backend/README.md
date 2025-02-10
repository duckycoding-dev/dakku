Need to check weather I'm suppose to compile the HonoJS app or let Bun run the TS code directly in production

[This official example](https://github.com/m-shaka/hono-rpc-perf-tips-example/tree/main) (talen from [here](https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended)) shows that running a build step only for the RPC client can be beneficial for speeding up the IDE.

This defined some package.json options, such as the exports field, and the tsconfig and tsconfig.build files, other than the `./src/index.ts` `./src/app.ts` `./src/hc.ts` files.
