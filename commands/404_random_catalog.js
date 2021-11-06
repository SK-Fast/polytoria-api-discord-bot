const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

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
  StartType(message)

  function DidAlittlerandomCatalog404() {
    TriedToget = TriedToget + 1
    let RandomizedGameId = getRandomInt(idlimit) + 1
    RequestAPINormal('https://polytoria.com/assets/thumbnails/catalog/' + RandomizedGameId.toString() + '.png',function(data,statuscode) {
    if (TriedToget >= 30) {
      message.channel.send("Uh oh... I couldn't find the catalog item because of I tried too many time!(Tried for 30 times). Please run the command again.")
      message.channel.stopTyping();

      return
    }    
    
    if (statuscode == 404) {
      DidAlittlerandomCatalog404()
      return
    }


    RequestAPIJSON('https://api.polytoria.com/v1/asset/info?id=' + RandomizedGameId.toString(),function(data2,statuscode2) {
      if (statuscode2 == 404 || typeof(data2) == "undefined") {
        message.channel.send('https://polytoria.com/assets/thumbnails/catalog/' + RandomizedGameId.toString() + '.png')
        message.channel.stopTyping();
        return
      } else {
        DidAlittlerandomCatalog404()
        return
      }
    })

    return
  })
  }
  DidAlittlerandomCatalog404()
}