import { ChatInputCommandInteraction, GuildMember } from "discord.js";

declare module 'fsutils';

declare function genDbId(): number;
declare function getDir(path: string): string;
declare function shuffleRand(string: string): string;
declare function capitalizeRand(string: string): string;
declare function formatDate(date: null|Date|string|number): string;
declare function truncateString(string: string, number?: number): string;
declare function getMessage(guild: string, channel: string, message: string): string;
declare function getMember(interaction: ChatInputCommandInteraction, key: string): undefined|GuildMember;
