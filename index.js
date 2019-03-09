const Discord = require('discord.js')
const fs      = require('fs')

const bot = new Discord.Client()
bot.commands = require('./utils/commandhandler.js')
bot.errors = []

function errorHandler(error, message) {
  var id = bot.errors.length
  bot.errors[id] = error.stack
  
  bot.log('Error reported at #' + id)
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
  const prefixes = process.env.PREFIXES.split(',')
  prefixes.push(`<@${bot.user.id}>`)
  
  return prefixes
}

function setDiscordActivity() {
  const prefixes = parsePrefixes()
  bot.user.setActivity(`${prefixes[0]}help`, {
    type: 1,
    url: 'https://twitch.tv/#',
    status: 'dnd'
  })
}

bot.on('ready', () => {bot.log('Ready to go.'); setDiscordActivity()})

bot.on('message', async(message) => {
  const prefixes = parsePrefixes()
  const content  = message.content.toLowerCase()
  
  var prefix = prefixes.filter(x => content.startsWith(x))[0]
  if (!prefix) return // Not a command.
  
  var args = message.content.slice(prefix.length).split(' ')
  args = args.filter(x => x.length > 0)
  var cmd  = args.shift().toLowerCase()
  
  const ctx = {
    client: bot,
    bot: bot,
    prefix: prefix,
    command: cmd,
    message: message,
    channel: message.channel,
    author: message.author,
    member: message.member,
    reply: message.reply,
    send: message.channel.send
  }
  const command = bot.commands.get(cmd)
  if (command.length === 0) return
  if (command.length > 1) return ctx.reply(
    'duplicate commands has been detected.'
    + '\n```\n' + command.map(x => x.name).join(', ') + '```'
  ).catch()
  
  command[0].callback.call(ctx, message, ...args).catch(err => {
    errorHandler(err, message)
  })
})

bot.on('error', errorHandler)

bot.login(process.env.TOKEN)