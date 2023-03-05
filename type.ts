import { Player, PlayerEvents } from "@jadestudios/discord-music-player";
import {
  Client,
  Collection,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import Database from "./database";

export interface MyClient extends Client {
  player?: Player;
  postgres?: Database;
  commands?: Collection<string, command>;
  slashCommands?: Collection<string, slashCmd>;
}

export interface command {
  readonly name: string;
  readonly description: string;
  readonly args?: boolean;
  readonly aliases?: string[];
  readonly usage?: string;
  execute: (message: Message, args: string[], client: MyClient) => any;
}

export interface slashCmd {
  readonly data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => any;
}

export interface event {
  name: string;
  once?: boolean;
  execute: (client: MyClient, ...args: any[]) => any;
}

export interface playerEvent {
  name: keyof PlayerEvents;
  execute: (client: MyClient, ...args: any[]) => any;
}

export type queueData = {
  msgChannel: Message["channel"];
};
