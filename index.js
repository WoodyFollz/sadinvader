const Discord = require('discord.js')
const fs      = require('fs')

const bot = new Discord.Client()
bot.settings = fs.existsSync('./settings.json')
                            ? require('./settings.json')
                            : process.env
bot.commands = require('./utils/commandhandler.js')
bot.errors = []

function errorHandler(error, message) {
  var id = bot.errors.length
  bot.errors[id] = error.stack

  bot.log('Error reported at #' + id)
  console.error(error)
  if (message) {
    message.reply('an error has been occured with ID ' + id)
  }
}

bot.log = (text) => console.log(`@${bot.user.tag}: ${text}`)

const files = fs.readdirSync('./commands')
files.forEach(file => {
  var list = require('./commands/' + file)(bot)
  list.forEach(bot.commands.add)
  console.log('> File loaded ' + file)
})

function parsePrefixes() {
  var prefixes = bot.settings.DISCORD_PREFIXES

  if (!(bot.settings.DISCORD_PREFIXES instanceof Array))
    prefixes = prefixes.split('|')
  prefixes.push(`<@${bot.user.id}>`)
  
  return prefixes
}

function setDiscordActivity() {
  const prefixes = parsePrefixes()
  const status = `${prefixes[0]}help | `
               + `${bot.guilds.size} guilds`
  bot.user.setStatus('idle')
  bot.user.setActivity(status, {type: 3})
}

bot.on('ready', async() => {
  setDiscordActivity()
  bot.log('Fully loaded.')
})

bot.on('message', async(message) => {
  if (bot.user.bot && message.author === bot.user) return // prevent command loop
  const prefixes = parsePrefixes()
  const content  = message.content.toLowerCase()

  var prefix = prefixes.filter(x => content.startsWith(x))[0]
  if (!prefix) return // Not a command.

  var args = message.content.slice(prefix.length).split(' ')
  args = args.filter(x => x.replace('\n', '').length > 0)
  var cmd  = args.shift().toLowerCase()

  const ctx = {
    client: bot,
    bot: bot,
    prefix: prefix,
    commandName: cmd,
    message: message,
    guild: message.guild,
    channel: message.channel,
    author: message.author,
    member: message.member,
    reply: message.reply,
    send: function(...params) {
      return new Promise((resolve, reject) => {
        this.channel.send(...params).then(resolve).catch(e => {
          this.author.send(...params).then(resolve).catch()
        })
      })
    }
  }
  const command = bot.commands.get(cmd)
  if (command.length === 0) return
  if (command.length > 1) return ctx.reply(
    'duplicate commands has been detected.'
    + '\n```\n' + command.map(x => x.name).join(', ') + '```'
  ).catch()
  ctx.command = command

  // Pass checks
  var passed = await bot.commands.checkContext(command, ctx)
  if (passed === false) return
  // If checks passed: run the command
  command[0].callback.call(ctx, message, ...args).catch(err => {
    errorHandler(err, message)
  })
})

bot.on('error', errorHandler)

bot.login(bot.settings.DISCORD_TOKEN)
