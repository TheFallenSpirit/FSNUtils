import dayjs from 'dayjs';
import { ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { randomInt } from 'node:crypto';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

/**
 * Generates a database-safe identification number.
 * @returns {number}
 */
export const genDbId = () => randomInt(11111111, 99999999);

/**
 * Resolves the current directories path from import.meta.url.
 * @param {string} path 
 * @returns {string}
 */
export const getDir = (path) => dirname(fileURLToPath(path));

/**
 * Generates a Discord message link.
 * @param {string} guild 
 * @param {string} channel 
 * @param {string} message 
 * @returns {string}
 */
export const getMessage = (guild, channel, message) => `https://discord.com/${guild}/${channel}/${message}`;

/**
 * Formats a date with dayjs to a nice string.
 * @param {Date|null|string|number} date 
 * @returns {string}
 */
export const formatDate = (date) => dayjs(date).format('dddd, MMMM Do, YYYY HH:mm (DD/MM/YY) (z)');

/**
 * Truncates a string.
 * @param {string} string 
 * @param {number} length 
 * @returns {string}
 */
export const truncateString = (string, length = 1000) => {
    if (string.length <= length) return string;
    else return `${string.substring(0, Math.min(length, string.length))}...`;
};

/**
 * Returns a member if a member is found with the specified key on an interaction option.
 * @param {ChatInputCommandInteraction} interaction 
 * @param {string} key 
 * @returns {undefined|GuildMember}
 */
export const getMember = (interaction, key) => {
    const user = interaction.options.getUser(key);
    return interaction.guild?.members.cache.get(user?.id);
};

/**
 * Randomly capitalizes characters a string.
 * @param {string} string
 * @returns {string}
 */
export const capitalizeRand = (string) => {
    const chars = string.split('');
    for (let i = 0; i < chars.length; i++) {
        if (Math.random() < 0.5) chars[i] = chars[i].toUpperCase();
    }
    return chars.join('');
};

/**
 * Randomly shuffles around the characters in a string.
 * @param {string} string 
 * @returns {string}
 */
export const shuffleRand = (string) => {
    const chars = string.split('');
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
};

export { default as Embed } from './structures/Embed.js';
export { default as Confirm } from './structures/Confirm.js';
