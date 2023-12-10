import { Command } from "commander";
import { defaultCommand } from "./default";

function ipfsCommand() {
  const command = new Command();

  command
    .name("ipfs")
    .description("Get ipfs info")
    .addCommand(defaultCommand(), { isDefault: true });

  return command;
}



export { ipfsCommand };
