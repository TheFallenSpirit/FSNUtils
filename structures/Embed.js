import { resolveColor, EmbedBuilder } from "discord.js";

/**
 * Construct an embed with automatic 
 */
export default class Embed {
    /**
     * @param {object} data
     * @returns 
     */
    constructor(data) {
        return new EmbedBuilder({
            url: data.url,
            title: data.title,
            fields: data.fields,
            description: data.description,
            image: data.image ? { ...data.image } : undefined,
            color: data.color ? resolveColor(data.color) : undefined,
            thumbnail: data.thumbnail ? { url: data.thumbnail } : undefined,
            timestamp: data.timestamp ? data.timestamp : new Date().toISOString(),
            author: data.author && { name: data.author.name, icon_url: data.author.icon },
            footer: data.footer && { text: data.footer.label, icon_url: data.footer.icon }
        });
    }
};
