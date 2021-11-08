const {Client,MessageEmbed,Attachment} = require("discord.js")

module.exports = function(message,args) {

  const {RequestAPIJSON,RequestAPINormal,AxiosRequestAPIJSON} = require("../bot_modules/FetchService.js")
  const StartType = require("../bot_modules/TypingService.js")
  const getRandomInt = require("../bot_modules/RandomService.js")

  if (!args[1]) { message.channel.send("Missing args 1 | Please type Username!"); return }
    StartType(message)

    RequestAPIJSON("https://api.polytoria.com/v1/users/getbyusername?username=" + args[1],function(data){

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

      RequestAPIJSON("https://api.polytoria.com/v1/users/getappearance?id=" + data["ID"],function(data2,statuscode){
        const embed1 = new MessageEmbed()
        .setColor('#fe5953')
        .setTitle(data["Username"] + " Avatar.")
        .setURL('https://polytoria.com/user/' + data["ID"])
        .setThumbnail('https://polytoria.com/assets/thumbnails/avatars/' + data["AvatarHash"] + ".png")

        let Processed = 0

        let BrickWasted = 0
        let StudsWasted = 0

        const hatarray = data2["Wearables"]["Hats"]
        const hatnamesarray = []
        let Processlength = hatarray.length

        hatarray.forEach(function (item, index) {
          // Deprecated Hat vaild checking
          /*
          RequestAPINormal("https://api.polytoria.com/v1/asset/info?id=" + item,function(data4,statuscode3) {
            if (statuscode3 == 200) {
              console.log("Hat vaild, Passed.")*/
            RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + item,function(data3,statuscode2){
            Processed = Processed + 1
            if (typeof(data3) == "undefined") {
              console.log("Unable to load hat. Continuing...")
              hatnamesarray.push({"ItemName": "Unable to load Name", "ItemID": "1"})

            } else {
              hatnamesarray.push({"ItemName": data3["name"], "ItemID": data3["id"]})

              if (data3["currency"] == "Studs") {
                StudsWasted = StudsWasted + parseInt(parseInt(data3["price"]))
              } else {
                BrickWasted = BrickWasted + parseInt(parseInt(data3["price"]))
              }
            }
          })/*} else {
            Processed = Processed + 1

            console.log("Hat not vaild, Not Passed.")

          }

          }) */
          

        });
        function checkcatalogdata() {
          if(Processed >= Processlength) {

            let processhats = ""
    
            hatnamesarray.forEach(function (hatvalue, hatkey) {
              processhats = processhats + "[" + hatvalue["ItemName"] + "](https://polytoria.com/shop/" + hatvalue["ItemID"] + ")\n"
            })
    
            if (processhats == "") {
              processhats = "This user has no hats."
            }
    
            embed1.addField("Hats",processhats,false)

            let processtool = "None"
            let processface = "None"
            let processshirt = "None"
            let processpants = "None"
            let processtshirt = "None"
            let processhead = "None"

            let WearableArray = data2["Wearables"]

            function catalogprocess7() {


              let processbodycatalog = ""

              processbodycatalog = processbodycatalog + "**Shirt**: [" + processshirt + "]" + "(https://polytoria.com/shop/" + WearableArray["Shirt"] + ")\n"
              processbodycatalog = processbodycatalog + "**Pants**: [" + processpants + "]" + "(https://polytoria.com/shop/" + WearableArray["Pants"] + ")\n"
              processbodycatalog = processbodycatalog + "**Tool**: [" + processtool + "]" + "(https://polytoria.com/shop/" + WearableArray["Tool"] + ")\n"
              processbodycatalog = processbodycatalog + "**T-Shirt**: [" + processtshirt + "]" + "(https://polytoria.com/shop/" + WearableArray["TShirt"] + ")\n"
              processbodycatalog = processbodycatalog + "**Face**: [" + processface + "]" + "(https://polytoria.com/shop/" + WearableArray["Face"] + ")\n"
              processbodycatalog = processbodycatalog + "**Head**: [" + processhead + "]" + "(https://polytoria.com/shop/" + WearableArray["Head"] + ")\n"

              let proceessbodycolors = ""
              proceessbodycolors = proceessbodycolors + "**Head**: " + data2["BodyColors"]["Head"] + "\n"
              proceessbodycolors = proceessbodycolors + "**Torso**: " + data2["BodyColors"]["Torso"]+ "\n"
              proceessbodycolors = proceessbodycolors + "**LeftArm**: " + data2["BodyColors"]["LeftArm"]+ "\n"
              proceessbodycolors = proceessbodycolors + "**RightArm**: " + data2["BodyColors"]["RightArm"]+ "\n"
              proceessbodycolors = proceessbodycolors + "**LeftLeg**: " + data2["BodyColors"]["LeftLeg"]+ "\n"
              proceessbodycolors = proceessbodycolors + "**RightLeg**: " + data2["BodyColors"]["RightLeg"]+ "\n"

              embed1.addField("Wearables",processbodycatalog,false)
              embed1.addField("Body Colors",proceessbodycolors,false)
              embed1.addField("Money Wasted",`**${StudsWasted}** <:stud:905987085347983411> **${BrickWasted}** <:brick:905987077995376640>`,false)
              embed1.setFooter("Money wasted might be inaccurate due to price changes")
              message.channel.send("",embed1)
              message.channel.stopTyping();
            }

            function catalogprocess6() {
              if (WearableArray["Head"] == null) {
                catalogprocess7()
              } else {
                RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["Head"],function(data3,statuscode2){
                  processhead = data3["Head"]
                  if (parseInt(data3["price"]) == parseInt(data3["price_alt"])) { 

                   } else {
                  if (data3["currency"] == "Studs") {
                    StudsWasted = StudsWasted + parseInt(data3["price"])
                  } else {
                    BrickWasted = BrickWasted + parseInt(data3["price"])
                  }}
                  catalogprocess7()
                })
              }
            }

            function catalogprocess5() {
              if (WearableArray["TShirt"] == null) {
                catalogprocess6()
              } else {
                RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["TShirt"],function(data3,statuscode2){
                  processtshirt = data3["name"]
                  if (parseInt(data3["price"]) == parseInt(data3["price_alt"])) { 

                   } else {
                  if (data3["currency"] == "Studs") {
                    StudsWasted = StudsWasted + parseInt(data3["price"])
                  } else {
                    BrickWasted = BrickWasted + parseInt(data3["price"])
                  }}
                  catalogprocess6()
                })
              }
            }

            function catalogprocess4() {
              if (WearableArray["Pants"] == null) {
                catalogprocess5()
              } else {
                RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["Pants"],function(data3,statuscode2){
                  processpants = data3["name"]
                  if (parseInt(data3["price"]) == parseInt(data3["price_alt"])) { 

                   } else {
                  if (data3["currency"] == "Studs") {
                    StudsWasted = StudsWasted + parseInt(data3["price"])
                  } else {
                    BrickWasted = BrickWasted + parseInt(data3["price"])
                  }}
                  catalogprocess5()
                })
              }
            }

            function catalogprocess3() {
              if (WearableArray["Shirt"] == null) {
                catalogprocess4()
              } else {
                RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["Shirt"],function(data3,statuscode2){
                  processshirt = data3["name"]
                  if (parseInt(data3["price"]) == parseInt(data3["price_alt"])) { 

                   } else {
                  if (data3["currency"] == "Studs") {
                    StudsWasted = StudsWasted + parseInt(data3["price"])
                  } else {
                    BrickWasted = BrickWasted + parseInt(data3["price"])
                  }}
                  catalogprocess4()
                })
              }
            }

            function catalogprocess2() {
              if (WearableArray["Face"] == null) {
                catalogprocess3()
              } else {
                RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["Face"],function(data3,statuscode2){
                  processface = data3["name"]
                  if (parseInt(data3["price"]) == parseInt(data3["price_alt"])) { 

                   } else {
                  if (data3["currency"] == "Studs") {
                    StudsWasted = StudsWasted + parseInt(data3["price"])
                  } else {
                    BrickWasted = BrickWasted + parseInt(data3["price"])
                  }}
                  catalogprocess3()
                })
              }
            }

            if (WearableArray["Tool"] == null) {
              catalogprocess2()
            } else {
              RequestAPIJSON("https://api.polytoria.com/v1/asset/info?id=" + WearableArray["Tool"],function(data3,statuscode2){
                processtool = data3["name"]
                if (data3["currency"] == "Studs") {
                  StudsWasted = StudsWasted + parseInt(data3["price"])
                } else {
                  BrickWasted = BrickWasted + parseInt(data3["price"])
                }
                catalogprocess2()
              })
            }
  
    
          } else {
            setTimeout(() => {
              checkcatalogdata()
            }, 100);
          }
        }
        checkcatalogdata()
      })

    })
}