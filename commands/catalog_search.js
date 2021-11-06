const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")

    if (!args[1]) { message.channel.send("Missing args 1 | Please type what do you want to search!"); return }
    StartType(message)
    let thing2search = message.content.replace('p!catalog-search ', '').replace(/ /g, '%20') // Cut off command from thing that user want to search

    RequestAPIJSON('https://api.polytoria.com/v1/asset/catalog?page=0&q=' + thing2search,function(data,statuscode) {
      if (typeof(data) == "undefined") { 
        message.channel.send("Not found what're you looking for or API failed")
        message.channel.stopTyping();

        return
      }  
    if (data[0] == null) {
        message.channel.send("Not found what're you looking for.")
        message.channel.stopTyping();

        return
      }

      let locatedthing = data[0]

      RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + locatedthing["id"],function(data2,statuscode2){
        let proceesscreator = "[Creator Profile](https://polytoria.com/user/" + data2["creator"] + ")"

        let processemoji = "<:stud:905987085347983411>"
  
        let processcolor = '#fe5953'
  
        let buyemoji = "Buy!"
  
        if (locatedthing["currency"] == "Bricks") {
          processemoji = "<:brick:905987077995376640>"
          processcolor = "#92e714"
        }
  
        let processmessage = ""
  
        if (locatedthing["is_limited"]  == 1) {
          processmessage = "<:ProMember:906016237748879392> Limited Item\n"
        }
  
        let buytext = "["+ buyemoji +"](https://polytoria.com/shop/" + locatedthing["id"] + ")"
  
  
        const embed1 = new MessageEmbed()
        .setTitle(data2["name"])
        .setURL("https://polytoria.com/shop/" + locatedthing["id"])
        .setDescription(proceesscreator + "\n" + processmessage + "\n" + processemoji + " " + locatedthing["price"] + "\n\n" + buytext)
        .addFields(
          { name: 'Created At', value: `<t:${data2["time_created"]}>`,inline: true },
          { name: 'Updated At', value: `<t:${data2["time_updated"]}>`,inline: true },
          { name: 'Sales', value: data2["sales"],inline: false },
          { name: 'Favourites', value: data2["favourites"],inline: true },
          )
        .setColor(processcolor)
        .setThumbnail('https://polytoria.com/assets/thumbnails/catalog/' + data2["id"] + '.png')
  
        
        message.channel.send('',embed1)
        message.channel.stopTyping();
        return
      })
    })

}