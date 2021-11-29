const {Client,MessageEmbed,Attachment} = require("discord.js")
const Converter = require('timestamp-conv');

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

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
  StartType(message)

  function DidAlittlerandomUser() {
    TriedToget = TriedToget + 1
    let RandomizedGameId = getRandomInt(idlimit) + 1
    RequestAPIJSON('https://api.polytoria.com/v1/users/user?id=' + RandomizedGameId.toString(),function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the game because of I tried too many time!(Tried for 30 times). Please run the command again.")
        message.channel.stopTyping();

        return
      }   

    if (statuscode == 404 || typeof(data) == "undefined") {
      DidAlittlerandomUser()
          return
        }
        

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
          return
  })
  }
  DidAlittlerandomUser()
}
