import { ChatInputCommandInteraction, GuildMember, ButtonInteraction, EmbedBuilder } from "discord.js";

declare module 'fsutils';

interface Footer {
    icon?: string;
    label: string;
}

interface Author {
    name: string;
    icon?: string;
}

interface Image {
    url: string;
    width?: number;
    height?: number;
}

interface Opts {
    userId?: string;
    cancel?: string;
    timeout: number;
    confirm?: string;
}

interface EmbedData {
    url?: string;
    image?: Image;
    title?: string;
    author?: Author;
    footer?: Footer;
    thumbnail?: string;
    timestamp?: string;
    description?: string;
    fields?: APIEmbedField[];
    color?: `#${string}`|number;
}

declare function genDbId(): number;
declare function getDir(path: string): string;
declare function shuffleRand(string: string): string;
declare function capitalizeRand(string: string): string;
declare function formatDate(date: null|Date|string|number): string;
declare function truncateString(string: string, number?: number): string;
declare function getMessage(guild: string, channel: string, message: string): string;
declare function getMember(interaction: ChatInputCommandInteraction, key: string): undefined|GuildMember;

declare class Embed {
    public constructor(data: EmbedData);
}

declare class Confirm {
    private opts: Opts;
    private message: string;
    private interaction: ChatInputCommandInteraction;

    public constructor(interaction: ChatInputCommandInteraction, message: string, opts: Opts);

    public send(): Promise<ButtonInteraction>;
}
