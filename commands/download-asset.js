const {Client,MessageEmbed,MessageAttachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!args[1]) {return message.channel.send("Missing Item ID.")}

  StartType(message)

  RequestAPIJSON('https://api.polytoria.com/v1/asset/info?id=' + args[1],function(data,statuscode) {

    if (statuscode == 404 || typeof(data) == "undefined") {
      message.channel.send("Not found the asset you're looking for.")
      message.channel.stopTyping()
      return
    }

    message.channel.send("⚠ **Warning**\n> Do not use this method to stole other s' works, The purpose of this command is used to preview original source of asset, If you wish to download, resell it please ask the original creator first.")

    if (data["Type"] == "Audio") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.mp3','Audio.mp3');
      message.channel.send("<:Sound:914758244310867989> Audio loaded!",attachment)
      message.channel.stopTyping()

    } else if (data["Type"] == "Image") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Decal.png');
      message.channel.send("🖼 Image loaded!",attachment)
      message.channel.stopTyping()
    } else if (data["Type"] == "Face") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Decal.png');
      message.channel.send("😀 Face loaded!",attachment)
      message.channel.stopTyping()
    } if (data["Type"] == "Shirt") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Decal.png');
      message.channel.send("👕 Shirt loaded!",attachment)
      message.channel.stopTyping()
    } else if (data["Type"] == "Pants") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Decal.png');
      message.channel.send("👖 Pant loaded!",attachment)
      message.channel.stopTyping()
    } else if (data["Type"] == "Tshirt") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Decal.png');
      message.channel.send("😀 Face loaded!",attachment)
      message.channel.stopTyping()
    } else if (data["Type"] == "Hat") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.obj','Object.obj');
      message.channel.send("👒 Hat Object loaded!",attachment).then(oldmsg => {
        const attachment2 = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Texture.png');
        message.channel.send("🖼 Texture loaded!",attachment2)
        message.channel.stopTyping()

      })
    } else if (data["Type"] == "Tool") {
      const attachment = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.obj','Object.obj');
      message.channel.send("👒 Tool Object loaded!",attachment).then(oldmsg => {
        const attachment2 = new MessageAttachment('https://polytoria.com/assets/catalog/' + data["ID"] + '.png','Texture.png');
        message.channel.send("🖼 Texture loaded!",attachment2)
        message.channel.stopTyping()

      })
    } else {
      message.channel.send("`Failure` This asset type haven't been listed in this command yet..")
      message.channel.stopTyping()
    }


    })
    
}