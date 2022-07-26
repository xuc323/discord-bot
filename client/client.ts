import { Client, Collection, Message } from "discord.js";

export interface client extends Client {
  postgres?: any;
  player?: any;
  commands?: Collection<string, command>;
}

export interface command {
  readonly name: string;
  readonly description: string;
  readonly aliases?: string[];
  readonly args?: boolean;
  readonly usage?: string;
  readonly category: string;
  execute: (message: Message, args: string[], client: Client) => any;
}
