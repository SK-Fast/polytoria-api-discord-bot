/* 

  Polytoria API Discord bot
     Written by DevPixels
  
     Polytoria Username: DevPixels
     Github: SK-Fast

*/

// Get dependencies and setup Required Stuff //

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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

const HelpEmbed = new MessageEmbed()
     .setColor('#fe5953')
       .setTitle('Commands')
      .setDescription('Prefix: `p!`')
       .addFields(
        { name: 'catalog-search [Text to search]', value: '└ Search Catalog Item',inline: false },
        { name: 'random-game [id limit(optional)]', value: '└ Find Random game on polytoria',inline: false },
        { name: 'random-catalog [id limit(optional)]', value: '└ Find Random Catalog Item on polytoria',inline: false },
        { name: 'lookup [username]', value: '└ Lookup User Infomation',inline: false },
        { name: 'leaderboard [Category(optional)] [page number(optional)]', value: '└ Fetch Leaderboard',inline: false },

        )
        .setFooter("Made by DevPixels. Contact me at DevPixels#5746")

/////////////////////////////

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("api.polytoria.com", {
		type: "LISTENING",
		url: "https://api.polytoria.com"
	  });
})

// Request API and Give out JSON
async function RequestAPIJSON(APILink,func) {
  let restatus
  const response = await fetch(APILink).then(response => {
    restatus = response.status
    if (response.status == 200) {
      return response.json()

    }
  })
  .then(data => {
    func(data,restatus)
  })
}

// Request API and Give out all fetch result
async function RequestAPINormal(APILink,func) {
  const response = await fetch(APILink).then()
  .then(data => {
    func(data,data.status)
  })
}

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

  if (command === "ping") {
    if (!message.guild) { return }

    message.channel.send("Pong 🏓");
  }

  if (command === "help") {   
      message.channel.send("",HelpEmbed)
  }

  if (command === "echo") {
    message.channel.send("```" + args[1] + "```")
  }

  if (command === "catalog-search") {
    if (!args[1]) { message.channel.send("Missing args 1 | Please type what do you want to search!"); return }
    message.channel.startTyping();
    let thing2search = message.content.replace('p!catalog-search ', '').replace(/ /g, '%20') // Cut off command from thing that user want to search

    RequestAPIJSON('https://api.polytoria.com/v1/asset/catalog?page=0&q=' + thing2search,function(data,statuscode) {
      if (typeof(data) == "undefined") { 
        message.channel.send("Not found what're you looking for or API failed")
        message.channel.stopTyping();

        return
      }  
    if (data[0] == null) {
        message.channel.send("Not found what're you looking for.")
        message.channel.stopTyping();

        return
      }

      let locatedthing = data[0]

      RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + locatedthing["id"],function(data2,statuscode2){
        let proceesscreator = "[Creator Profile](https://polytoria.com/user/" + data2["creator"] + ")"

        let processemoji = "<:stud:905987085347983411>"
  
        let processcolor = '#fe5953'
  
        let buyemoji = "Buy!"
  
        if (locatedthing["currency"] == "Bricks") {
          processemoji = "<:brick:905987077995376640>"
          processcolor = "#92e714"
        }
  
        let processmessage = ""
  
        if (locatedthing["is_limited"]  == 1) {
          processmessage = "<:ProMember:906016237748879392> Limited Item\n"
        }
  
        let buytext = "["+ buyemoji +"](https://polytoria.com/shop/" + locatedthing["id"] + ")"
  
  
        const embed1 = new MessageEmbed()
        .setTitle(data2["name"])
        .setURL("https://polytoria.com/shop/" + locatedthing["id"])
        .setDescription(proceesscreator + "\n" + processmessage + "\n" + processemoji + " " + locatedthing["price"] + "\n\n" + buytext)
        .addFields(
          { name: 'Created At', value: `<t:${data2["time_created"]}>`,inline: true },
          { name: 'Updated At', value: `<t:${data2["time_updated"]}>`,inline: true },
          { name: 'Sales', value: data2["sales"],inline: false },
          { name: 'Favourites', value: data2["favourites"],inline: true },
          )
        .setColor(processcolor)
        .setThumbnail('https://polytoria.com/assets/thumbnails/catalog/' + data2["id"] + '.png')
  
        
        message.channel.send('',embed1)
        message.channel.stopTyping();
        return
      })
    })
  }


  if (command === "random-game") {
    let TriedToget = 0

    let idlimit = 1000
    if (args[1]) {
      if (isNaN(args[1]) == false) {
        if (parseInt(args[1]) >= 4000) {
          message.channel.send("I couldn't find the game with that much value!")
          return
        }
        idlimit = args[1]
      }
    }
    message.channel.startTyping();

    function DidAlittlerandomgame() {
      TriedToget = TriedToget + 1
      let RandomizedGameId = getRandomInt(idlimit) + 1
      RequestAPIJSON('https://api.polytoria.com/v1/games/info?id=' + RandomizedGameId.toString(),function(data,statuscode) {
        if (TriedToget >= 30) {
          message.channel.send("Uh oh... I couldn't find the game because of I tried too many time!(Tried for 30 times). Please run the command again.")
          return
        }   

      if (statuscode == 404 || typeof(data) == "undefined") {
            DidAlittlerandomgame()
            return
          }
          
          if (data["Active"] == false) {
            DidAlittlerandomgame()
            return
          }

          let ProcessDescription = data["Description"]

          if (ProcessDescription == "") {
            ProcessDescription = "No Description Set"
          }



          RequestAPINormal('https://polytoria.com/assets/thumbnails/games/' + RandomizedGameId + '.png',function(data2,statuscode2) {

            let ProcessImage = 'https://polytoria.com/assets/thumbnails/games/' + RandomizedGameId + '.png'

            if (statuscode2 == 404) {
              ProcessImage = 'https://polytoria.com/assets/img/game_unavail.png'
            }
            const embed1 = new MessageEmbed()
            .setTitle(data["Name"])
            .setURL("https://polytoria.com/games/" + RandomizedGameId.toString())
            .setDescription("*" + ProcessDescription + "*")
            .addFields(
              { name: 'Created At', value: `${data["CreatedAt"]}`,inline: true },
              { name: 'Updated At', value: `${data["UpdatedAt"]}`,inline: true },
              )
            .setColor('#fe5953')
            .setImage(ProcessImage)
            .setFooter("Tried: " + TriedToget)
            message.channel.send('',embed1)
            message.channel.stopTyping();
            return
        })

      return
    })
    }
    DidAlittlerandomgame()
  }

  if (command === "random-catalog") {
    if (!message.guild) { return }
    let TriedToget = 0

    let idlimit = 1000
    if (args[1]) {
      if (isNaN(args[1]) == false) {
        if (parseInt(args[1]) >= 6000) {
          message.channel.send("I couldn't find the catalog item with that much value!")
          return
        }
        idlimit = args[1]
      }
    }
    message.channel.startTyping();

    function DidAlittlerandomCatalog() {
      TriedToget = TriedToget + 1
      let RandomizedGameId = getRandomInt(idlimit) + 1
      RequestAPIJSON('https://api.polytoria.com/v1/asset/info?id=' + RandomizedGameId.toString(),function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the catalog item because of I tried too many time!(Tried for 30 times). Please run the command again.")
        return
      }    
      
      if (statuscode == 404 || typeof(data) == "undefined") {
        DidAlittlerandomCatalog()
        return
      }

      if (data["moderation_status"] !== "ACCEPTED") {
        DidAlittlerandomCatalog()
        return
      }

      const embed1 = new MessageEmbed()
      .setTitle(data["name"])
      .setURL("https://polytoria.com/shop/" + RandomizedGameId.toString())
      .setColor('#fe5953')
      .setImage('https://polytoria.com/assets/thumbnails/catalog/' + RandomizedGameId + '.png')
      .setFooter("Tried: " + TriedToget)
      message.channel.send('',embed1)
      message.channel.stopTyping();

      return
    })
    }
    DidAlittlerandomCatalog()
  }

  if (command === "cookie") {
    if (!message.guild) { return }

      message.channel.send("🍪")
  }

  if (command === "leaderboard") {
    if (!message.guild) { return }

    let reqtype = ""

    if (args[1]) {
      reqtype = "?c=" + args[1]
    }


    if (args[2] && args[1]) {
      reqtype = "?c=" + args[1] + "&p=" + args[2]
    }

    RequestAPIJSON("https://polytoria.com/api/fetch/leaderboard" + reqtype,function(data,statuscode){
      let DescProcess = ""
      let counter = 1
      for (const [key, value] of Object.entries(data)) {
        let InnerProcess = ""
        if (counter == 1) {
          InnerProcess = "🥇 " + InnerProcess 
        }
        if (counter == 2) {
          InnerProcess = "🥈 " + InnerProcess 
        }
        if (counter == 3) {
          InnerProcess = "🥉 " + InnerProcess 
        }

        InnerProcess = InnerProcess + "**" + value["username"] + "** | `" + value["statistic"] + "`\n"
        DescProcess = DescProcess + InnerProcess
        counter = counter + 1
      }

      const embed1 = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle("Polytoria Leaderboard")
      .setDescription("Username | Score\n\n" + DescProcess)
      .setFooter("You can also provide Category(networth, posts, comments, views, sales) and Page Number")

      message.channel.send("",embed1)
    })
  }

  if (command === "lookup") {
    if (!message.guild) { return }
    if (!args[1]) { message.channel.send("Missing args 1 | Please type Username!"); return }
    message.channel.startTyping();


      RequestAPIJSON("https://api.polytoria.com/v1/users/getbyusername?username=" + args[1],function(data){
        if (typeof(data) == "undefined") { 
          message.channel.send("This user doesn't exist or API failed!")
          message.channel.stopTyping();

          return
        }
        if (data["Success"] == false) {
          message.channel.send("This user doesn't exist!")
          message.channel.stopTyping();

          return
        }

        let RankData = ""

        if (data["Rank"] == "ADMINISTRATOR") {
          RankData = "<:staff:906010778165973022> This user is a staff member\n" 
        }
	      
	 if (data["ID"] == 307934245215535104 || data["ID"] == 632047150838186004) {
          RankData = RankData + "<:troll:905997754868854855> This user is one of Polytoria API bot creator, mad respecc\n" 
        }

        let AnotherData = ""

        if (data["MembershipType"] == "PRO_UNLIMITED") {
          AnotherData = "<:ProMember:906016237748879392> This user is a pro member!\n" 
        }


        const embed1 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(data["Username"] + " profile.")
        .setURL('https://polytoria.com/user/' + data["ID"])
        .setDescription(RankData + AnotherData + "\n" + data["Description"])
        .addFields(
          { name: 'UserId', value: data["ID"],inline: true },
          { name: 'Joined at', value: `<t:${data["JoinedAt"]}>`,inline: true },
          { name: 'Last seen', value: `<t:${data["LastSeenAt"]}>`,inline: false },
          { name: 'Trade Value', value: data["TradeValue"],inline: true },
        )
        .setThumbnail('https://polytoria.com/assets/thumbnails/avatars/headshots/' + data["AvatarHash"] + ".png")
          .setFooter('Replying to ' + message.author.tag + '(' + message.author.id + ')')

        message.channel.send("",embed1)
        message.channel.stopTyping();

      })

    }

	// Add Cooldown
     talkedRecently.add(message.author.id);
        setTimeout(() => {
		// Remove After Cooldown ends
          talkedRecently.delete(message.author.id);
        }, CooldownTime);
  
})

// Login bot
client.login('TOKEN')
