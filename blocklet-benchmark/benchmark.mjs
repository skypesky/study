import { $ } from "bun";

await Promise.all([
  $`npx @blocklet/benchmark run --config server.yml`,
  $`npx @blocklet/benchmark run --config service.yml`,
  $`npx @blocklet/benchmark run --config blocklet.yml`,
  $`npx @blocklet/benchmark run --config benchmark-long.yml`,
]);
