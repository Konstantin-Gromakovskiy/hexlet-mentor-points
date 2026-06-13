import {Bot} from "grammy";

const API_KEY = process.env.BOT_API_KEY

if (!API_KEY) throw new Error("API_KEY is not defined");

const index = new Bot(API_KEY);

index.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

index.on("message", (ctx) => ctx.reply("Привет!21"));

index.start();

