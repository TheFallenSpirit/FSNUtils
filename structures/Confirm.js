import { ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } from 'discord.js';
import { genDbId10 } from '../index.js';

/**
 * Constructs a comfirm modal and replies to the interaction with it.
 */
export default class Confirm {
    opts;
    message;
    interaction;

    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {string} message 
     * @param {object} opts
     * @param {number} opts.timeout
     * @param {string} [opts.userId]
     * @param {string} [opts.cancel]
     * @param {string} [opts.confirm]
     */
    constructor (interaction, message, opts) {
        this.opts = opts;
        this.message = message;
        this.interaction = interaction;
    }

    /**
     * @async
     * @returns {ButtonInteraction}
     * @throws {ButtonInteraction}
     */
    send = async () => {
        return await new Promise(async (resolve, reject) => {
            const id = genDbId10();
            const cancelBtn = new ButtonBuilder({ label: this.opts.cancel ? this.opts.cancel : 'Cancel', style: ButtonStyle.Secondary, customId: `btn.${id}.cancel` });
            const confirmBtn = new ButtonBuilder({ label: this.opts.confirm ? this.opts.confirm : 'Confirm', style: ButtonStyle.Danger, customId: `btn.${id}.confirm` });
            const row = new ActionRowBuilder({ components: [confirmBtn, cancelBtn] });
            await this.interaction.reply({ components: [row], content: this.message });
            cancelBtn.setDisabled(true);
            confirmBtn.setDisabled(true);
            const collector = this.interaction.channel?.createMessageComponentCollector({ max: 1, time: this.opts.timeout, filter: (i) => this.opts.userId ? i.user.id === this.opts.userId : i.user.id === this.interaction.user.id });
            collector?.on('collect', async (int) => {
                if (int.componentType !== ComponentType.Button) return;
                await int.update({ components: [row] });
                switch (int.customId) {
                    case `btn.${id}.confirm`:
                        resolve(int);
                        break;

                    case `btn.${id}.cancel`:
                        reject(int);
                        break;
                }
            });
        });
    }
};
