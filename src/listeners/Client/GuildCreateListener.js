const { Listener } = require('../../structure')

module.exports = class GuildCreateListener extends Listener {
    constructor () {
        super({
            name: 'guildCreate'
        })
        
    }
   async run (guild) {
       const database = require('firebase').database()
       const db = await database.ref(`Servidores/${guild.id}/Configs`).once('value')

       if(db.val() === null) {
          database.ref(`Servidores/${guild.id}/Configs`).set({
            prefix: "z!",
            systemAntiInvite: false,
            systemAntiCapsLock: false,
            systemAntiLinks: false,
            BemVindoStatus: false,
            BemVindoID: "undefined",
            MensagemBemVindo: `Olá {member}, Seja bem-vindo(a) a {guild.name}`,
            SaidaStatus: false,
            SaidaID: "undefined",
            SaidaMensagem: `{member} saiu do Servidor :(`,
            LevelSystem: false,
            LevelUpMessage: "Parabéns {author}, Você subiu para o Level {level}!"
          })
       }
       
      const aDb = await database.ref(`Servidores/${guild.id}/Locale`).once('value')
      if(aDb.val() === null) {
       database.ref(`Servidores/${guild.id}/Locale`).set({ Language: "pt-BR" })
      }

       const { MessageEmbed } = require('discord.js')

       const embed = new MessageEmbed()
       .setDescription(`
       Fui Adicionada em um Servidor......
       
       Nome:
       ${guild.name}(\`${guild.id}\`)

       Dono(a):
       ${guild.owner.user.tag}(\`${guild.owner.user.id}\`)

       Número de Membros:
       ${guild.memberCount}

       Agora temos ${this.guilds.cache.size} Servidores e ${this.users.cache.size} Usuários!
       `)
       .setColor('GREEN')
       .setThumbnail(guild.iconURL({ dynamic: true }))
       this.channels.cache.get("761378501130584074").send(embed)
   }
}
