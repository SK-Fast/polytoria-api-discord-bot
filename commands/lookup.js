const {Client,MessageEmbed,Attachment} = require("discord.js")
const Converter = require('timestamp-conv');

module.exports = function(message,args,botinfo) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")


  if (!args[1]) { message.channel.send("Missing args 1 | Please type Username!"); return }
  let thing2search = message.content.replace(botinfo["Prefix"] + 'lookup ', '').replace(/ /g, '%20')
  console.log(thing2search)

    StartType(message)


      RequestAPIJSON("https://api.polytoria.com/v1/users/getbyusername?username=" + thing2search,function(data){
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
	      
	 if (data["ID"] == 16342 || data["ID"] == 7348) {
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
          { name: 'Joined at', value: new Converter.timestamp(data["JoinedAt"]).formatDay.replace(".", "/").replace(".", "/"),inline: true },
          { name: 'Last seen', value: new Converter.timestamp(data["LastSeenAt"]).formatDay.replace(".", "/").replace(".", "/"),inline: false },
          { name: 'Trade Value', value: data["TradeValue"],inline: true },
        )
        .setThumbnail('https://polytoria.com/assets/thumbnails/avatars/headshots/' + data["AvatarHash"] + ".png")
          .setFooter('Replying to ' + message.author.tag + '(' + message.author.id + ')')
        message.channel.send("",embed1)
        message.channel.stopTyping();

      })
}
