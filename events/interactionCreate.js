const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Collection } = require('discord.js');
const player = new Collection();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}

		else if (interaction.isButton()) {
			if (interaction.customId === 'Join') {
				const modal = new ModalBuilder()
					.setCustomId('lvl')
					.setTitle('Character lvl');

				const lvlInput = new TextInputBuilder()
					.setCustomId('lvlInput')
					.setLabel('What is your characters lvl for this session?')
					.setStyle(TextInputStyle.Short);

				const firstActionRow = new ActionRowBuilder().addComponents(lvlInput);

				modal.addComponents(firstActionRow);

				await interaction.showModal(modal);
			}
		}

		else if (interaction.isModalSubmit()) {
			if (interaction.customId === 'lvl') {

				const lvl = interaction.fields.getTextInputValue('lvlInput');
				console.log(interaction.user.id, interaction.user.username, { lvl });
				player.set(`${interaction.user.username} LVL: ${lvl}`);

				const scheduleEmbed = interaction.message.embeds[0];
				const firstEmbed = EmbedBuilder.from(scheduleEmbed);

				firstEmbed.spliceFields(0, 1,
					{
						name: 'Players',
						value: `${player.first(6)}`,
						inline: true,
					},
				);

				await interaction.message.edit ({ embeds: [firstEmbed], ephemeral:true });
			}
		}
	},
};