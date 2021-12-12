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
    RequestAPIJSON('https://api.polytoria.com/v1/guild/info?id=' + RandomizedGameId.toString(),function(data,statuscode) {
      if (TriedToget >= 30) {
        message.channel.send("Uh oh... I couldn't find the game because of I tried too many time!(Tried for 30 times). Please run the command again.")
        message.channel.stopTyping();

        return
      }   

    if (statuscode == 404 || typeof(data) == "undefined") {
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
          
          let verifdata = ""
    
          if (data["IsVerified"] == true) {
              verifdata = "<:checkmark:919148026520539146>"
          }
      
          let descdata = data["Description"]
      
          if (descdata == "") {
              descdata = "No Description Set."
          }
      
          const embed1 = new MessageEmbed()
            .setTitle(data["Name"] + " " + verifdata)
            .setDescription(descdata)
            .setURL("https://polytoria.com/guilds/" + data["ID"].toString())
            .setColor('#fe5953')
            .setThumbnail('https://polytoria.com/assets/thumbnails/guilds/' + data["ID"].toString() + '.png')
            .setFooter("Tried: " + TriedToget.toString())
      
          RequestAPIJSON('https://api.polytoria.com/v1/users/user?id=' + data["CreatorID"].toString(),function(data3,statuscode3) {
      
              let ownerdata = ""
      
              if (typeof(data3) == "undefined") {
                  ownerdata = "Unknown"
              } else {
                  ownerdata = "[" + data3["Username"] + "](https://polytoria.com/user/" + data3["ID"] + ")"
              }
      
              embed1.addField("Owner",ownerdata,true)
              embed1.addField("Members",data["Members"].toString(),true)
              embed1.addField("Created at",new Converter.timestamp(data["CreatedAt"]).formatDay.replace(".", "/").replace(".", "/").toString(),false)
      
              message.channel.send('',embed1)
              message.channel.stopTyping();
        
              return
          })
          
      })

    return
  })
  }
  DidAlittlerandomgame()
}