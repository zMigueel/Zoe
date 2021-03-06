const { Command } = require('../../structure')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'shutdown',
      aliases: ['desligar'],
      category: 'Developer',
      devOnly: true
    })
  }

  async run({channel, msg, author}) {
    channel.send('Tem certeza que você quer me desligar ?').then(async msge => {
      msge.react('✅')
      msge.react('❌')

      const ss = (reaction, user) => reaction.emoji.name === '✅' && user.id === author.id
      const nn = (reaction, user) => reaction.emoji.name === '❌' && user.id === author.id

      const sim = msge.createReactionCollector(ss)
      const nao = msge.createReactionCollector(nn)

      sim.on('collect', () => {
        msg.delete()
        channel.send('<:checkSweet:757016162633646211> | Ok, Estou desligando')
        this.client.destroy()
        process.exit()
      })

      nao.on('collect', () => {
        msg.delete()
        channel.send('<:checkSweet:757016162633646211> | Obrigada! :3')
      })
    })
  }
}
