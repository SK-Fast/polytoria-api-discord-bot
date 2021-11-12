const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  let TriedToget = 0
  StartType(message)

  function DidAlittlerandomgame() {
    TriedToget = TriedToget + 1
    let RandomizedGameId = getRandomInt(900) + 1
    RequestAPINormal('https://polytoria.com/assets/thumbnails/games/banners/' + RandomizedGameId.toString() + ".png",function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the game because of I tried too many time!(Tried for 30 times). Please run the command again.")
        message.channel.stopTyping();

        return
      }   

      if (statuscode == 404) {
        DidAlittlerandomgame()
        return
      }

      message.channel.send('https://polytoria.com/assets/thumbnails/games/banners/' + RandomizedGameId.toString() + ".png")

          message.channel.stopTyping();
          return
  

    return
  })
  }
  DidAlittlerandomgame()
}