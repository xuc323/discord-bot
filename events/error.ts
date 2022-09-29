import { event, MyClient } from "../type";

const e: event = {
  name: "error",
  execute(client: MyClient, error: Error) {
    console.log(`BOT ERROR: ${error}`);
  },
};

export default e;
