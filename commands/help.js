const Discord = require('discord.js')

/* ==========================
This is a first version. ====
Contributions are welcomed. =
========================== */
async function helpCommand(message) {
  const cmds = this.bot.commands.stored

  var desc  = cmds.map(cmd => `**${cmd.name}**: ${cmd.desc || 'No description available.'}`)
  var embed = new Discord.RichEmbed()
              .setTitle('Command List')
              .setColor(this.guild.me.displayHexColor)
              .setDescription(desc.join('\n'))
              .setFooter(`${cmds.length} commands available!`)
  return await this.send({embed: embed})
}

module.exports = () => [
  {
    name: 'help',
    desc: 'Get the list of available commands.',
    callback: helpCommand
  }
]
