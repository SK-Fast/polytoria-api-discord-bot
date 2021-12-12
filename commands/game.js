const {Client,MessageEmbed,MessageAttachment} = require("discord.js")
const Converter = require('timestamp-conv');

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!args[1]) {return message.channel.send("Missing Game ID.")}

  StartType(message)
  RequestAPIJSON('https://api.polytoria.com/v1/games/info?id=' + args[1],function(data,statuscode) {
    if (typeof(data) == "undefined") {
        message.channel.stopTyping();

        return message.channel.send("This game doesn't exist or the API failed.")
    }

    let verifdata = ""

    let descdata = data["Description"]

    if (descdata == "") {
        descdata = "No Description Set."
    }

    const embed1 = new MessageEmbed()
      .setTitle(data["Name"] + " " + verifdata)
      .setDescription(descdata)
      .setURL("https://polytoria.com/games/" + data["ID"].toString())
      .setColor('#fe5953')
      .setFooter('Replying to ' + message.author.tag + '(' + message.author.id + ')')
      .addFields(
        { name: 'Visits', value: data["Visits"],inline: true },
        { name: 'Likes', value: data["Likes"],inline: true },
        { name: 'Dislikes', value: data["Dislikes"],inline: true },
        { name: 'Active Game', value: data["IsActive"],inline: true },
        { name: 'Ratio percent', value: Math.round(data["Likes"] / (data["Likes"] + data["Dislikes"]) * 100) + "%",inline: true },
      )
      

    RequestAPIJSON('https://api.polytoria.com/v1/users/user?id=' + data["CreatorID"].toString(),function(data2,statuscode2) {

        RequestAPINormal('https://polytoria.com/assets/thumbnails/games/' + data["ID"] + '.png',function(data3,statuscode3) {

            let ProcessImage = 'https://polytoria.com/assets/thumbnails/games/' + data["ID"] + '.png'
  
            if (statuscode3 == 404) {
              ProcessImage = 'https://polytoria.com/assets/img/game_unavail.png'
            }

            console.log(ProcessImage)

            embed1.setThumbnail(ProcessImage)

            let ownerdata = ""

            if (typeof(data2) == "undefined") {
                ownerdata = "Unknown"
            } else {
                ownerdata = "[" + data2["Username"] + "](https://polytoria.com/user/" + data2["ID"] + ")"
            }
            embed1.addField("Creator",ownerdata,true)
            embed1.addField("Created at",new Converter.timestamp(data["CreatedAt"]).formatDay.replace(".", "/").replace(".", "/").toString(),false)
            embed1.addField("Updated at",new Converter.timestamp(data["UpdatedAt"]).formatDay.replace(".", "/").replace(".", "/").toString(),true)
    
            message.channel.send('',embed1)
            message.channel.stopTyping();
      
            return
        })

    
    })

  })
}