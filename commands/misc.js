const Discord = require('discord.js')

async function ping(message) {
  return this.reply('pong.')
}

async function pong(message) {
  return this.reply('ping.')
}

async function invite(message) {
  const app = await this.bot.fetchApplication()
  const url = app.botPublic ? this.bot.generateInvite(['ADMINISTRATOR']) : 'Private bot.'
  const embed = new Discord.RichEmbed()
                .setAuthor(app.name, app.iconURL)
                .setDescription(`Owner: <@${app.owner.id}>`
                .setColor(this.guild.me.displayHexColor)
                .addField('Invitation', url)
  
  return this.send({embed: embed})
}

module.exports = () => [
  {
    name: 'ping',
    callback: ping
  }, {
    name: 'pong',
    callback: pong
  }, {
    name: 'invitebot',
    callback: invite,
    aliases: ['ib']
  }
]