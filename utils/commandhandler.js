const commands = []
exports.stored = commands

exports.add = (obj) => commands.push(obj)

exports.get = function get(name) {
  //check: exact name
  var command = commands.filter(x => {
    return x.name === name || (x.aliases && x.aliases.includes(name))
  })[0]
  if (command) return [command]

  //check: starting name with
  if (!command) {
    command = commands.filter(x => x.name.startsWith(name))
    return command
  }
  return []
}

exports.checkContext = async function check(command, ctx) {
  const checks = command.checks
  if (!checks) return true

  if (checks.guildOnly) {
    if (ctx.channel.type === 'dm') {
      ctx.send('This command is only available in a guild.')
      return false
    }
  }

  if (checks.ownerOnly) {
    const app = await ctx.bot.fetchApplication()

    if (ctx.author.id != app.owner.id) return false
  }
}
