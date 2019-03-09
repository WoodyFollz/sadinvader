const Discord = require('discord.js')

// Declaring objects
exports.members = {}

// Utils functions
function sortABCOrder(a, b) {
	a = a.user.tag.toLowerCase()
	b = b.user.tag.toLowerCase()
	return a < b ? 1 : (a > b ? -1 : 0)
}

exports.members.parse = function(ctx, string) {
  string = string.toLowerCase()
  
  // ID Parsing
  var id = parseInt(string.replace(/[\\<>@!]/g, '')) || 0
  var search = ctx.guild.members.get(id)
  if (search) return search
  
  // Tag Parsing
  var members = [...ctx.guild.members.values()]
  members = members.sort(sortABCOrder)
  var search = members.filter(x => x.user.tag.toLowerCase().startsWith(string))
  if (search[0]) return search[0]
  
  // Tag Parsing (Less Rude)
  var search = members.filter(x => ('@'+x.user.tag.toLowerCase()).includes(string))
  if (search[0]) return search[0]
}