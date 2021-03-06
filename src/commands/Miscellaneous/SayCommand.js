const { Command } = require("../../structure")

module.exports = class SayCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'say',
            aliases: ['falar', 'fale'],
            description: 'Faça eu falar algo',
            usage: '<prefix>say @MrGamingBR o Melhor :D',
            category: 'Miscellaneous'
        })
    }
    run ({ args, member, author, channel }) {
        const dizer = args.join(" ")
		if (!args.join(" ")) {
			return channel.send(`***O <@${author.id}> mandou eu dizer nada '-'***`, { disableEveryone: true })
        }

		if (member.permissions.has("ADMINISTRATOR")) {
			return channel.send(dizer)
		}
    channel.send(`***O <@${author.id}> mandou eu dizer..***   ` + dizer, { disableEveryone: true })
    }
}
