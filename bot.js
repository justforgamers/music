const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";




client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : EX Clan`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : EX Clan ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`jfgs`,"http://twitch.tv/justforgamerstv")
client.user.setStatus("dnd")
});



client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
        if(!message.channel.guild) return;
            var args = message.content.split(" ").slice(1).join(" ");
            if(command == "bc") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.forEach(member => {
                                            let bc = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bc);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            if(command == "bco") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.filter(r => r.presence.status !== "offline").size} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.filter(r => r.presence.status !== "offline").forEach(member => {
                                            let bco = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bco);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
});



client.on("message", async message => {
    if(message.content == prefix + "server") {
        if(!message.channel.guild) return;
            if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("ليس لديك الصلآحية الكآفية . :broken_heart:");
            }

                let server = new Discord.RichEmbed()
                    .setAuthor(message.guild.name)
                    .setColor("RANDOM")
                    .setTitle("Server Info :hearts: :sparkles:")
                    .setDescription(`Members :bust_in_silhouette: : ${message.guild.memberCount}\nOwner :crown: : ${message.guild.owner.user.username}\nServer ID :id: : ${message.guild.id}\nRoles :lock: : ${message.guild.roles.size}\nRegion :earth_africa: : ${message.guild.region.toUpperCase()}`);

                    message.channel.sendEmbed(server);

    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "banned")) {
        if(!message.guild) return;
        message.guild.fetchBans()
        .then(bans => {
            let b = bans.size;
            let bb = bans.map(a => `${a}`).join(" - ");
            message.channel.send(`**\`${b}\` | ${bb}**`);
        });
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "invite")) {
        let invite = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(message.author.avatarURL)
            .setTitle("**Click Here To Invite The Bot To Your Server :sparkling_heart:**")
            .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
            message.channel.sendEmbed(invite);
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "help")) {
        let help = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(`**__Broadcast bot | Version 1.1__ 

            normal broadcast : ${prefix}bc
            broadcast for online only : ${prefix}bco
            invite : ${prefix}invite
            The support server :https://discord.gg/Q6wWhBD
            **`);
            message.channel.sendEmbed(help); // 
    }
});


client.on("message", message => { //clear
              var args = message.content.substring(prefix.length).split(" ");
              if (message.content.startsWith(prefix + "clear")) {
                  if(!message.channel.guild) return message.reply('**? اسف لكن هذا الامر للسيرفرات فقط **');         
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**?  لا يوجد لديك صلاحية لمسح الشات**');
          var msg;
          msg = parseInt();
        
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.sendMessage("", {embed: {
          title: "``تــم مسح الشات ``",
          color: 0x5016f3, 
          footer: {
            
          }
        }}).then(msg => {msg.delete(3000)});
                            }
  
       
});





client.on('message', function(message) {
    if(message.content.startsWith(prefix + "report")) {
        let messageArgs = message.content.split(" ").slice(1).join(" ");
        let messageReason = message.content.split(" ").slice(2).join(" ");
        if(!messageReason) return message.reply("**# Specify a reason!**");
    let mUser = message.mentions.users.first();
    if(!mUser) return message.channel.send("Couldn't find user.");
    let Rembed = new Discord.RichEmbed()
    .setTitle("`New Report!`")
    .setThumbnail(message.author.avatarURL)
    .addField("**# - Reported User:**",mUser,true)
    .addField("**# - Reported User ID:**",mUser.id,true)
    .addField("**# - Reason:**",messageReason,true)
    .addField("**# - Channel:**",message.channel,true)
    .addField("**# - Time:**",message.createdAt,true)
    .setFooter("if the report is a joke you will get punished")
message.channel.send(Rembed)
message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
    msg.react("✅")
    msg.react("❌")
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
    message.guild.owner.send(Rembed)
    message.reply("**# - Done! 🎇**");
})
reaction2.on("collect", r => {
    message.reply("**# - Canceled!**");
})
})
}
});

    
 


client.on("message", function(message) {
   
   if(message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("Rock","🇷",true)
    .addField("Paper","🇵",true)
    .addField("Scissors","🇸",true)
    message.channel.send(RpsEmbed).then(msg => {
        msg.react(' 🇷')
        msg.react("🇸")
        msg.react("🇵")
.then(() => msg.react('🇷'))
.then(() =>msg.react('🇸'))
.then(() => msg.react('🇵'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '🇷' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '🇸' && user.id === message.author.id;
let reaction3Filter = (reaction, user) => reaction.emoji.name === '🇵' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
       
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 12000 });
reaction1.on("collect", r => {
        message.channel.send(result)
})
reaction2.on("collect", r => {
        message.channel.send(result)
})
reaction3.on("collect", r => {
        message.channel.send(result)
})
 
    })
}
});






client.login(process.env.BOT_TOKEN);
