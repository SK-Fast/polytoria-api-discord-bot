/* 
  Polytoria API Discord bot
     Written by DevPixels, StarManTheGamer
  
     Polytoria Username: DevPixels, bags
     Github: SK-Fast, StarManTheGamer
*/

// Get dependencies and setup Required Stuff //

const {Client,MessageEmbed,Attachment} = require("discord.js")
const client = new Client()
const dotenv = require("dotenv")
let isNaN = require('is-nan');
const talkedRecently = new Set();

dotenv.config()

/////////////////////////////

// Customable Variables //

const prefix = 'p!' // Bot s' Default Prefix

const TOKEN = process.env.TOKEN // Bot s' Token

const CooldownTime = 3000

const CommandsRequire = {
  "help": require("./commands/help.js"),
  "cmd": require("./commands/help.js"),
  "catalog-search" : require("./commands/catalog_search.js"),
  "cs" : require("./commands/catalog_search.js"),
  "ping" : require("./commands/ping.js"),
  "random-game" : require("./commands/random_game.js"),
  "rg" : require("./commands/random_game.js"),
  "random-user" : require("./commands/random_user.js"),
  "ru" : require("./commands/random_user.js"),
  "inspect-avatar" : require("./commands/inspect-avatar.js"),
  "ia" : require("./commands/inspect-avatar.js"),
  "404-random-catalog" : require("./commands/404_random_catalog.js"),
  "4rc" : require("./commands/404_random_catalog.js"),
  "random-catalog" : require("./commands/random_catalog.js"),
  "rc" : require("./commands/random_catalog.js"),
  "leaderboard" : require("./commands/leaderboard.js"),
  "lb" : require("./commands/leaderboard.js"),
  "lookup" : require("./commands/lookup.js"),
  "l" : require("./commands/lookup.js"),
  "stud2brick": require("./commands/stud2brick.js"),
  "s2b": require("./commands/stud2brick.js"),
  "brick2stud": require("./commands/brick2stud.js"),
  "b2s": require("./commands/brick2stud.js"),
  "super-secret-command": require("./commands/super-secret-command.js"),
  "random-banner": require("./commands/random-banner.js"),
  "rb": require("./commands/random-banner.js"),
  "invite": require("./commands/invite.js"),
  "inv": require("./commands/invite.js"),
  "information": require("./commands/information.js"),
  "info": require("./commands/information.js"),
  "level": require("./commands/level.js"),
  "version": require("./commands/version.js"),
  "card": require("./commands/card.js"),
  "download-asset": require("./commands/download-asset.js"),
   "guild": require("./commands/guild.js"),
}

/////////////////////////////

let LastestMessageWithImage = {}

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("p!help", {
		type: "LISTENING",
		url: "https://api.polytoria.com"
	  });
    console.log("ID: "+  client.user.id)
})

// Get Random number from 0 to max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// On Message sent
client.on("message", message => {
	
let Attachment = (message.attachments)
  if (Attachment){
    LastestMessageWithImage[message.guild.id] = Attachment.array()[0] 
  }
	
    if(message.author.bot) return; // Check if the author is bot

    if (!message.content.startsWith(prefix)) return; // Check if the message start with prefix
    if (!message.guild) { return } // Check if the message wasn't in DM
	
	if (talkedRecently.has(message.author.id)) {
	     message.channel.send("Please wait until using another command!(" + CooldownTime / 1000 + " per command)");
	     return
	}

  const args = message.content.trim().split(/ +/g);
  const command = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix


  if (CommandsRequire[command]) {
    CommandsRequire[command](message,args,{Prefix: prefix,LastestImg:LastestMessageWithImage[message.guild.id]})
    return
  }

  /*
  if (command === "help") {   
      message.channel.send("",HelpEmbed)
  }*/

  /*if (command === "echo") {
    message.channel.send("```" + args[1] + "```")
  } */


  if (command === "cookie") {
    if (!message.guild) { return }

      message.channel.send("🍪")
  }



	// Add Cooldown
     talkedRecently.add(message.author.id);
        setTimeout(() => {
		// Remove After Cooldown ends
          talkedRecently.delete(message.author.id);
        }, CooldownTime);
  
})

// Login bot
client.login(TOKEN)
