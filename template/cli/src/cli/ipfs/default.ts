import { Command } from "commander";

function defaultCommand(): Command {
  const command = new Command();

  command
    .name("search")
    .argument("[path]", "Get ipfs info(size, cid etc) for a specified path")
    .description("Get ipfs info")
    .action(async (path: string ) => {

      if(!path) {
        return command.help();
      }


      console.log('your path is', path)
  
    });
  
    return command;
}


export { defaultCommand };
