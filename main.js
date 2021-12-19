const main = async () => {
    const settings = require('./settings.json')
    const strings = require('./strings.json')
    const { Client, Intents } = require('discord.js');
    const clientIntents = new Intents();
    clientIntents.add("GUILDS","GUILD_MESSAGES","GUILD_PRESENCES");
    class fractal_announcer {
        constructor(){
            this.client;
            this.current_string;
            this.max_strings;
        }
        async boot(){
            if(!strings?.data?.length){console.log("No Message Strings!");return}
            if(!settings?.client_secret?.length > 0){console.log("Missing Client Secret");return}
            if(!settings?.message_frequency?.length > 0){console.log("Missing Message Frequency Setting");return}
            if(!settings?.channel_id?.length > 0){console.log("Missing Channel ID Setting");return}
            this.max_strings = strings.data.length
            this.client = new Client({
                ws: {
                    intents: clientIntents
                },
                intents: clientIntents
            });
            this.client.login(settings.client_secret).catch(console.error);
            setInterval(async() => {
                await this.send_message().catch(k => console.log(k))
            },parseInt(settings.message_frequency) * 1000)
        }
        async send_message(){
            if(this.current_string === (this.max_strings - 1)){
                this.current_string = 0
                this.client.channels.cache.get(settings.channel_id).send(strings.data[this.current_string])
            }else{
                this.client.channels.cache.get(settings.channel_id).send(strings.data[this.current_string])
                this.current_string++
            }
        }
    }
    var instance = new fractal_announcer()
    await instance.boot()
}
main().catch(k => {
    console.log(k)
})