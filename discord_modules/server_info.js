const {timeToStr} = require('time-str');

module.exports = (msg, args, client) => {
    if (!msg.guild) {
        console.log('guild not found');
        return;
    }
    const guild = msg.guild;
    let count = 0;
    for (const _ of guild.channels.cache) {
        count++;
    }
    const channelCount = count;
    const now = new Date().getTime();
    const out = [
        { name: 'name', value: guild.name, inline: false },
        { name: 'id', value: guild.id, inline: false },
        { name: 'region', value: guild.region.toString(), inline: false },
        { name: 'createdAt', value: guild.createdAt.toString(), inline: false },
        { name: 'time since created', value: timeToStr(now - guild.createdAt.getTime()), inline: false },
        { name: 'owner', value: guild.owner.toString(), inline: false },
        { name: 'memberCount', value: guild.memberCount.toString(), inline: true },
        { name: 'channelCount', value: channelCount.toString(), inline: true },
    ];
    const obj = {
        embed: {
            fields: out,
        }
    };
    if (!!guild.iconURL) {
        obj.embed.thumbnail = {
            url: guild.iconURL,
        }
    }
    msg.channel.send(obj);
}