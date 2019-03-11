const Discord = require('discord.js')
const moment  = require('moment')

async function ping(message) {
  return this.reply('pong.')
}

async function pong(message) {
  return this.reply('ping.')
}

async function invite(message) {
  const app = await this.bot.fetchApplication()
  const url = app.botPublic ? await this.bot.generateInvite(['ADMINISTRATOR']) : 'Private bot.'
  const embed = new Discord.RichEmbed()
                .setAuthor(app.name, app.iconURL)
                .setDescription(`Owner: <@${app.owner.id}>`)
                .setColor(this.guild.me.displayHexColor)
                .addField('Invitation', url)

  return this.send({embed: embed})
}

async function uptime(message) {
  const uptime = moment(this.bot.uptime)
  var days = uptime.dayOfYear()-1 ? `${uptime.dayOfYear()-1} days ` : ''

  return await this.send(`Started until ${days}${uptime.format('HH:mm:ss')}.`)
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
  }, {
    name: 'uptime',
    callback: uptime
  }
]
