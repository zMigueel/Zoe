const { Command } = require('../../structure')

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: 'kick',
            aliases: ['kickar', 'expulsar'],
            category: 'Moderation'
        })
    }
   async run ({ channel, member, msg, guild, mentions, args, author }) {
     const { MessageEmbed } = require('discord.js')
    if(!member.permissions.has("KICK_MEMBERS")) {
            return channel.send("<:xSweet:756989900661850182> | Você não tem a permissão Expulsar Membros")
          }

          if(!guild.me.permissions.has("KICK_MEMBERS")) {
            return channel.send("<:xSweet:756989900661850182> | Eu não tenho a permissão Expulsar Membros")
          }

          var membro = mentions.members.first() || guild.members.cache.get(args[0])
          if(!membro) return channel.send("<:xSweet:756989900661850182> | Você precisa mencionar alguem!")
          if(membro.user.id === author.id) {
            return channel.send("<:xSweet:756989900661850182> | Você não pode se Expulsar!")
          }
          if(membro.user.id === this.client.user.id) {
            return channel.send("<:xSweet:756989900661850182> | Por que você quer me Expulsar ?")
          }
          if(!membro.bannable) {
            return channel.send("<:xSweet:756989900661850182> | Eu não posso Expulsar este Membro,Ele pode ter um cargo maior ou igual ao meu")
          }

          let motivo = args.slice(1).join(" ")
          if(!motivo) motivo = "Não Definido"

           const msge = await channel.send(`<@${author.id}>, Você quer mesmo Expulsar ${membro.user.tag} ? Clique em uma das reações abaixo! `)
           await msge.react('✅')
           await msge.react('❌')

           const sim = (reaction, user) => reaction.emoji.name === '✅' && user.id === author.id
           const no = (reaction, user) => reaction.emoji.name === '❌' && user.id === author.id
           const collectorDaMsg = msg.createReactionCollector(sim)
           const collectorNo = msg.createReactionCollector(no)

           collectorDaMsg.on('collect', async r => {
            msge.delete()
            const embedPv = new MessageEmbed()
            .setTitle("Você foi expulso(a)!")
            .setColor("RED")
            .setThumbnail(author.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField("👮‍♂️ Quem Puniu:", author.tag, false)
            .addField("📜 Motivo:", motivo, false)
            .setTimestamp()
            .setFooter(`Solicitado por ${author.username}`, author.displayAvatarURL({ dynamic: true, size: 2048 }))
            membro.send(embedPv).catch(err => {
              channel.send(`<:xSweet:756989900661850182> | Não foi possivel enviar a Mensagem na DM do Membro expulso devido a ${err}`)
            })

            membro.kick({ reason: motivo })

            const embed = new MessageEmbed()
            .setTitle(":thumbsup: Membro(a) Expulso(a)!")
            .setColor("RED")
            .setThumbnail(author.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField("👤 Expulso(a) :", membro.user.tag, false)
            .addField("👮‍♂️ Quem Puniu:", author.tag, false)
            .addField("📜 Motivo:", motivo, false)
            .setTimestamp()
            .setFooter(`Solicitado por ${author.username}`, author.displayAvatarURL({ dynamic: true, size: 2048 }))

             const abs = await channel.send(embed)
             await abs.react('🍪')

             channel.send('Alguém mais quer ser expulso ? Hehehe')
           })

           collectorNo.on('collect', r => {
             msge.delete()
           })
    }
}
