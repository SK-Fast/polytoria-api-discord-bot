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
  "catalog-search" : require("./commands/catalog_search.js"),
  "ping" : require("./commands/ping.js"),
  "random-game" : require("./commands/random_game.js"),
  "random-user" : require("./commands/random_user.js"),
  "404-random-catalog" : require("./commands/404_random_catalog.js"),
  "random-catalog" : require("./commands/random_catalog.js"),
  "leaderboard" : require("./commands/leaderboard.js"),
  "lookup" : require("./commands/lookup.js"),
  "stud2brick": require("./commands/stud2brick.js"),
  "inspect-avatar": require("./commands/inspect-avatar.js"),
  "brick2stud": require("./commands/brick2stud.js"),
  "information": require("./commands/information.js"),
  "invite": require("./commands/invite.js"),
  "super-secret-command": require("./commands/super-secret-command.js"),
}

/////////////////////////////

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
    CommandsRequire[command](message,args)
    
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
