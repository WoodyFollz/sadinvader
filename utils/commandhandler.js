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
  if (checks === undefined || Object.keys(checks).length == 0)
    return true

  /* [LOCAL CHECK] Is it in a guild? */
  if (checks.guildOnly) {
    if (ctx.channel.type === 'dm') {
      ctx.bot.emit('failedCheck_guildOnly', ctx)
      return false
    }
  }

  /* [LOCAL CHECK] Is the author owner? */
  if (checks.ownerOnly) {
    var owners
    if (ctx.bot.settings.DISCORD_OWNER) {
      owners = ctx.bot.settings.DISCORD_OWNER
      if (!(owners instanceof Array)) owners = owners.split('|')
    } else {
      owners = [await ctx.bot.fetchApplication().owner.id]
    }

    if (!owners.includes(ctx.author.id)) {
      ctx.bot.emit('failedCheck_ownerOnly', ctx)
      return false
    }
  }
}
