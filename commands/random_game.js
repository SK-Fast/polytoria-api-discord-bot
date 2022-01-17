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

  function DidAlittlerandomgame() {
    TriedToget = TriedToget + 1
    let RandomizedGameId = getRandomInt(idlimit) + 1
    RequestAPIJSON('https://api.polytoria.com/v1/games/info?id=' + RandomizedGameId.toString(),function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the game because of I tried too many time!(Tried for 30 times). Please run the command again.")
        message.channel.stopTyping();

        return
      }   

    if (statuscode == 404 || typeof(data) == "undefined") {
          DidAlittlerandomgame()
          return
        }
        
        if (data["IsActive"] == false) {
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
            { name: 'Created At', value: new Converter.timestamp(data["CreatedAt"]).formatDay.replace(".", "/").replace(".", "/"),inline: true },
            { name: 'Updated At', value: new Converter.timestamp(data["UpdatedAt"]).formatDay.replace(".", "/").replace(".", "/"),inline: true },
        { name: 'Visits', value: data["Visits"],inline: true },
        { name: 'Likes', value: data["Likes"],inline: true },
        { name: 'Dislikes', value: data["Dislikes"],inline: true },
        { name: 'Active Game', value: data["IsActive"],inline: true },
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
