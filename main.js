const main = async () => {
    const settings = require('./settings.json')
    const strings = require('./strings.json')
    const { Client, Intents } = require('discord.js');
    const clientIntents = new Intents();
    //clientIntents.add("GUILDS","GUILD_MESSAGES","GUILD_PRESENCES");
    class fractal_announcer {
        constructor(){
            this.client;
            this.current_string = 0;
            this.max_strings;
            this.guild_id;
        }
        async boot(){
            if(!strings?.data?.length){console.log("No Message Strings!");return}
            if(!settings?.client_secret?.length > 0 && !process.env.LOCAL_AUTH){console.log("Missing Client Secret");return}
            if(!settings?.message_frequency?.length > 0){console.log("Missing Message Frequency Setting");return}
            if(!settings?.channel_id?.length > 0){console.log("Missing Channel ID Setting");return}
            this.max_strings = strings.data.length
            this.guild_id = settings.guild_id
            this.client = new Client({
                ws: {
                    intents: clientIntents
                },
                intents: clientIntents
            });
            this.client.login(process.env.LOCAL_AUTH ? process.env.LOCAL_AUTH : settings.client_secret).catch(console.error);
            this.client.on("message", message => {
                if (message.author.id === "921987621511643170") message.suppressEmbeds(true)
            })
            setInterval(async() => {
                await this.send_message().catch(k => console.log(k))
            },parseInt(settings.message_frequency) * 1000)
        }

        async send_message(){
            //const guild_id = 688889842032967694
            //const guild = await this.client.guilds.cache.get(this.guild_id)
            /*if(this.current_string === (this.max_strings - 1)){
                this.current_string = 0
                this.client.channels.fetch(settings.channel_id).then(channel => channel.send(strings.data[this.current_string]))
            }else{
                this.client.channels.fetch(settings.channel_id).then(channel => channel.send(strings.data[this.current_string]))
                this.current_string++
            }*/
            this.client.channels.fetch(settings.channel_id).then(channel => channel.send(`Hi everyone. Welcome to the Fractal Discord! If you are new here, please visit 👉 #start-here to get started and to assign your roles. 

Visit 📜 <#921997638591733760> to learn more about the project, airdrop, launch, and invitations. 

To catch up within the last 24-48 hours, check out our 📣 <#921997616055722004>!

To learn more about the specifics of the project, visit our Medium article: Introducing Fractal - <https://fractal.medium.com/introducing-fractal-98a8162a0a6f>"`))
            
        } 
    }
    var instance = new fractal_announcer()
    await instance.boot()
}
main().catch(k => {
    console.log(k)
})