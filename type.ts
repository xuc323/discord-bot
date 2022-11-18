import { Player, PlayerEvents } from "discord-music-player";
import { Client, Collection, Message } from "discord.js";
import Database from "./database";

export interface MyClient extends Client {
  player?: Player;
  postgres?: Database;
  commands?: Collection<string, command>;
}

export interface command {
  readonly name: string;
  readonly description: string;
  readonly args?: boolean;
  readonly aliases?: string[];
  readonly usage?: string;
  execute: (message: Message, args: string[], client: MyClient) => any;
}

export interface event {
  name: string;
  execute: (client: MyClient, ...args: any[]) => any;
}

export interface playerEvent {
  name: keyof PlayerEvents;
  execute: (client: MyClient, ...args: any[]) => any;
}

export type queueData = {
  msgChannel: Message["channel"];
};
