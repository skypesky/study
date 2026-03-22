#! /usr/bin/env node

import { createProgram } from "../classes";

(async () => {
  const program = createProgram();
  await program.parseAsync();
})();
