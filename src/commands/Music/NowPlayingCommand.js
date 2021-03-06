const { Command } = require('../../structure')

module.exports = class NowPlayingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nowplaying',
      aliases: ['np'],
      category: 'Music',
      voiceChannelOnly: true,
      playerOnly: true,
      playingOnly: true
      })
    }
  run ({ channel, guild, lavalink }) {
    const { Utils } = require("erela.js"),
    { MessageEmbed } = require("discord.js"),
    player = lavalink.players.get(guild.id)

    if (player.position > 5000){
      getnowplaying()
    }
          if (player.position < 5000){
            setTimeout(() => {
            getnowplaying()
            }, 3000)
          }

          function getnowplaying(){
          let { title, duration, requester, identifier } = player.queue[0];
          let amount = `${Utils.formatTime(player.position, true)}`
          const part = Math.floor((player.position / duration) * 10);
          const giveEmbed = new MessageEmbed()
            .setColor("AQUA")
            .setThumbnail(`http://i.ytimg.com/vi/${identifier}/hqdefault.jpg`)
            .setDescription(`${player.playing ? "▶️" : "⏸️"} Tocando Agora: ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\n Pedido por: ${requester.tag}`)

        channel.send({embed: giveEmbed}).then(m => {
            const counter = setInterval(() => {
            if(player.playing !== true){
              clearInterval(counter)
            }
          if (player.position > 5000) {
          if (player.position < 60000) {
            if (player.playing === true) {
            let { title, author, duration, thumbnail, requester } = player.queue[0];
            let amount = `00:${Utils.formatTime(player.position, true)}`
            const part = Math.floor((player.position / duration) * 10);
            giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Tocando Agora: ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\n Pedido por: ${requester.tag}`)
            }
          } else {
            if(player.playing === true) {
            let { title, author, duration, thumbnail, requester } = player.queue[0];
            const amount = `${Utils.formatTime(player.position, true)}`
            const part = Math.floor((player.position / duration) * 10);
            giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Tocando Agora: ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(9 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\n Pedido por: ${requester.tag}`)
            }
          }
        }
          m.edit(giveEmbed)
          }, 4000)
      })
     }
  }
}
