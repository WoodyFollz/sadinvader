const Discord = require('discord.js')
const moment  = require('moment')
const utils   = require('../utils/discord.js')

async function userinfo(message, ...string) {
  var member
  if (string.length) {
    string = string.join(' ')
    member = utils.members.parse(this, string)
  }
  if (!member) member = this.member
  var user = member.user

  var desc = [
    ['Account created', moment(user.createdTimestamp).format('L')],
    ['Joined guild', moment(member.joinedTimestamp).format('L')]
  ]
  var embed = new Discord.RichEmbed()
              .setAuthor(member.displayName,
                         member.user.avatarURL)
              .setThumbnail(member.user.avatarURL)
              .setTitle('User Information')
              .setDescription(desc.map(x => `**${x[0]}**: ${x[1]}`).join('\n'))
              .setColor(member.displayHexColor)
              .setFooter(`ID: ${member.id}`)
  return this.send({embed: embed})
}

module.exports = () => [
  {
    name: 'userinfo',
    callback: userinfo,
    aliases: ['ui'],
    checks: {
      guildOnly: true
    }
  }
]
