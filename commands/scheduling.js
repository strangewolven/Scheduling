const { SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, Collection } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Creates a message with the scheduling info.')
		.addStringOption(option =>
			option.setName('date')
				.setDescription('Set the date of the session.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Set the time of the session.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('rumor')
				.setDescription('Set the rumor of the session.')
				.setRequired(true)),

	async execute(interaction) {
		await interaction.deferReply();

		const Join = new ButtonBuilder()
			.setCustomId('Join')
			.setLabel('Join ⚔️')
			.setStyle(ButtonStyle.Success);

		const Cancel = new ButtonBuilder()
			.setCustomId('Cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Danger);

		const DM = new ButtonBuilder()
			.setCustomId('DM')
			.setLabel('DM 📖')
			.setStyle(ButtonStyle.Success);

		const DM_cancel = new ButtonBuilder()
			.setCustomId('DM_cancel')
			.setLabel('DM Cancel')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(Join, Cancel, DM, DM_cancel);

		const player = new Collection;
		const dm = new Collection;

		const date = interaction.options.getString('date');
		const time = interaction.options.getString('time');
		const rumor = interaction.options.getString('rumor');

		const scheduleEmbed = {
			color: 0x3A5311,
			title: `Date: ${date}   Time: ${time}`,
			description: `__Rumor:__ ${rumor}`,
			fields: [
				{
					name: 'Players',
					value: `${player.first(6)}`,
					inline: true,
				},
				{
					name: 'DM',
					value: `${dm.first()}`,
				},
			],
			timestamp: new Date().toISOString(),
		};
		await interaction.editReply({ embeds: [scheduleEmbed], components: [row], fetchReply:true, ephemeral:true });
	},
};