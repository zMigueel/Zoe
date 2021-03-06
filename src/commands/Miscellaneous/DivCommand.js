const { Command } = require('../../structure')

module.exports = class DivulgationCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'div',
      aliases: ['invites', 'divstats'],
      category: 'Miscellaneous'
    })
  }
   async run({ channel, mentions, author, guild }) {
    const { MessageEmbed } = require('discord.js')

    let user = mentions.users.first()
    if(!user) user = author

    const targetInvites = await guild.fetchInvites()

    let invitesUses = 0.

    targetInvites.forEach(invite => {
      if (invite.inviter.id === user.id) {
        invitesUses += invite.uses
      }
    });

    const embed = new MessageEmbed()
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor("AQUA")
      .setTitle("Nick: " + user.username)
      .setDescription(`
      Membros Convidados por ${user}:
${invitesUses} Membros

T
        `)
    channel.send(embed)
  }

}
