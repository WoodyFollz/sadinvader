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
              .setAuthor(`@${member.user.tag}`,
                         member.user.avatarURL)
              .setThumbnail(member.user.avatarURL)
              .setTitle('User Information')
              .addField('Joined at', 'idk')
  return this.send({embed: embed})
}

module.exports = () => [
  {
    name: 'userinfo',
    callback: userinfo,
    aliases: ['ui']
  }
]