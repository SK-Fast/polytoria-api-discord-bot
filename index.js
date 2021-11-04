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

dotenv.config()

/////////////////////////////

// Customable Variables //

const prefix = 'p!' // Bot s' Default Prefix

const TOKEN = process.env.TOKEN // Bot s' Token

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

    RequestAPIJSON('https://polytoria.com/api/fetch/catalog/items?page=0&sort=0&q=' + thing2search,function(data,statuscode) {
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

      let proceesscreator = "By: [" + locatedthing["CreatorName"] + "](https://polytoria.com/user/" + locatedthing["CreatorID"] + ")"

      let processemoji = "<:stud:905405361576628246>"

      let processcolor = '#fe5953'

      let buyemoji = "<:Buy_0_0:905416708955701300><:Buy_1_0:905416709505167380><:Buy_2_0:905416709119307809><:Buy_3_0:905416709475794964>\n<:Buy_0_1:905416709492604928><:Buy_1_1:905416709261889577><:Buy_2_1:905416709538738176><:Buy_3_1:905416709794590750>"

      if (locatedthing["Currency"] == "Bricks") {
        processemoji = "<:brick:905405352101687337>"
        processcolor = "#92e714"
      }

      let processmessage = ""

      if (locatedthing["Limited"]  == true) {
        processmessage = "⭐ Limited Item\n"
      }

      let buytext = "["+ buyemoji +"](https://polytoria.com/shop/" + locatedthing["AssetID"] + ")"


      const embed1 = new MessageEmbed()
      .setTitle(locatedthing["AssetName"])
      .setURL("https://polytoria.com/shop/" + locatedthing["AssetID"])
      .setDescription(proceesscreator + "\n" + processmessage + "\n" + processemoji + " " + locatedthing["Price"] + "\n\n" + buytext)
      .setColor(processcolor)
      .setThumbnail('https://polytoria.com/assets/thumbnails/catalog/' + locatedthing["AssetID"] + '.png')

      
      message.channel.send('',embed1)
      message.channel.stopTyping();

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
          RankData = "🛠 This user is a staff member\n" 
        }

        let AnotherData = ""

        if (data["MembershipType"] == "PRO_UNLIMITED") {
          AnotherData = "⭐ This user is a pro member!\n" 
        }


        const embed1 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(data["Username"] + " s' profile.")
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

 
  
})

// Login bot
client.login(TOKEN)