const Discord = require('discord.js')
const utils = require('../utils/discord.js')

async function userinfo(message, ...string) {
  var member
  if (string.length) {
    string = string.join(' ')
    member = utils.members.parse(this, string)
  }
  if (!member) member = this.member
  
  var embed = new Discord.RichEmbed()
              .setAuthor(member.displayName,
                         member.user.avatarURL)
              .setThumbnail(member.user.avatarURL)
              .setTitle('User Information')
              .addField('Joined guild at', member.joinedAt)
              .addField('Created account at',
                        member.user.createdAt)
              .setColor(member.displayHexColor)
              .setFooter(`ID: ${member.id}`)
  return this.send({embed: embed})
}

module.exports = () => [
  {
    name: 'userinfo',
    callback: userinfo,
    aliases: ['ui']
  }
]