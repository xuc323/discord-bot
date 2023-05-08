// import { Client, Guild } from "discord.js";
// import ytdl from "ytdl-core";
// import ytsr from "ytsr";
// import { MyClient } from "../type";

// enum repeatMode {
//   None,
//   Song,
//   Queue,
// }

// interface song {
//   name: string;
//   duration: string;
// }

// interface musicQueue {
//   guild: Guild;
//   queue: song[];
// }

// interface playerOptions {
//   quitOnEnd: boolean;
//   quitOnEmpty: boolean;
// }

// class musicPlayer {
//   private client: MyClient;
//   private queue: musicQueue[];
//   private repeatMode: repeatMode;
//   private options: playerOptions;

//   public constructor(
//     client: Client,
//     { quitOnEmpty = false, quitOnEnd = false }: playerOptions
//   ) {
//     this.client = client;
//     this.queue = [];
//     this.repeatMode = repeatMode.None;
//     this.options = { quitOnEmpty, quitOnEnd };
//   }

//   public async play(url: string) {
//     const stream = ytdl(url, {
//       quality: "highestaudio",
//       highWaterMark: 1 << 62,
//     });
//     stream.on("error", (err) => {
//       console.log(err);
//     });
//   }

//   private async search(query: string) {
//     const result = ytsr(query, { limit: 20 });
//     console.log(result);
//   }

//   public get getQueue(): string {
//     const str: string[] = [];
//     for (const q of this.queue) {
//     }
//     return str.join("");
//   }

//   public set setRepeatMode(mode: repeatMode) {
//     this.repeatMode = mode;
//   }
// }

// export default musicPlayer;
