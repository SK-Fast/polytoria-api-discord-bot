const {Client,MessageEmbed,MessageAttachment} = require("discord.js")
const Converter = require('timestamp-conv');

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!args[1]) {return message.channel.send("Missing Guild ID.")}

  StartType(message)
  RequestAPIJSON('https://api.polytoria.com/v1/guild/info?id=' + args[1],function(data,statuscode) {
    if (typeof(data) == "undefined") {
        message.channel.stopTyping();

        return message.channel.send("This guild doesn't exist or api failed.")
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

    RequestAPIJSON('https://api.polytoria.com/v1/users/user?id=' + data["CreatorID"].toString(),function(data2,statuscode2) {

        let ownerdata = ""

        if (typeof(data2) == "undefined") {
            ownerdata = "Unknown"
        } else {
            ownerdata = "[" + data2["Username"] + "](https://polytoria.com/user/" + data2["ID"] + ")"
        }

        embed1.addField("Owner",ownerdata,true)
        embed1.addField("Members",data["Members"].toString(),true)
        embed1.addField("Created at",new Converter.timestamp(data["CreatedAt"]).formatDay.replace(".", "/").replace(".", "/").toString(),false)

        message.channel.send('',embed1)
        message.channel.stopTyping();
  
        return
    })

  })
}