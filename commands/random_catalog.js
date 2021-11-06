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

    function DidAlittlerandomCatalog() {
      TriedToget = TriedToget + 1
      let RandomizedGameId = getRandomInt(idlimit) + 1
      RequestAPIJSON('https://api.polytoria.com/v1/asset/info?id=' + RandomizedGameId.toString(),function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the catalog item because of I tried too many time!(Tried for 30 times). Please run the command again.")
        message.channel.stopTyping();

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