const { Command } = require('../../structure')

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: 'blowjob',
            aliases: [],
            category: 'NSFW +18'
        })
    }
    run ({ channel, author }) {
        const Discord = require('discord.js')
  const superagent = require('superagent')

 if (channel.nsfw === true) {
 superagent.get('https://love-you.xyz/api/v2/blowjob')
 .end((err, response) => {
     const embed = new Discord.MessageEmbed()
     .setDescription(`Não consegue Ver o(a) Gif/Img? [Clique aqui](${response.body.url})`)
     .setImage(response.body.url)
       .setColor('RANDOM')
     .setFooter(`Solicitado por ${author.username}`, author.displayAvatarURL({ dynamic: true, size: 2048 }))
     channel.send(embed)
    })
   } else {
   channel.send({ files: [{ attachment: './Assets/NSFW.gif', name: 'NotSafeForWork.gif' }] })
   }
    }
}
