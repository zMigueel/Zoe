const { Command } = require('../../structure')

module.exports = class BlacklistRemoveCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'blacklistremove',
            aliases: ['asunaunban', 'asunaunbans'],
            category: 'Developer',
            devOnly: true
        })
    }
   async run ({ channel, author, args }) {
           const firebase = require('firebase')
            const database = firebase.database()

            const memberID = args[0]

           if(!memberID) return channel.send('Me diga um id!')

           const db = await database.ref(`Global/Blacklist/${memberID}`)
            .once('value')
            if (db.val() === null) {
                return channel.send('Esse usuário não está Banido')
            }

        database.ref(`Global/Blacklist/${memberID}`).set(null)
            

        channel.send(`<:checkSweet:757016162633646211> | ${author}, Usuário desbanido com sucesso, Tomará que não quebre as regras novamente.`)
        
    }
}
