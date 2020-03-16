const {timeToStr} = require('time-str');

module.exports = (msg, args, client) => {
    let id = args.length === 0 ? msg.author.id : args[0];
    id = /(\d+)/.exec(id)[1] || null;
    if (id === null) {
        return msg.channel.send(`this is not a valid userId`);
    }
    const now = new Date().getTime();
    client.users.fetch(id).then(res => {
        const obj = {
            embed: {
                fields: [
                    { name: 'username', value: res.username + '#' + res.discriminator, inline: true },
                    { name: 'tag', value: `<@${res.id}>`, inline: true },
                    { name: 'createdAt', value: res.createdAt.toString(), inline: false },
                    { name: 'time since create', value: timeToStr(now - res.createdAt.getTime()), inline: false },
                ]
            }
        };
        if (!!res.defaultAvatarURL) {
            obj.embed.thumbnail = {
                url: res.avatarURL(),
            }
        }

        if (!msg.guild) {
            console.error(`was not a guild request`);
            return msg.channel.send(obj);
        }

        msg.guild.members.fetch(id).then(guildMember => {
            obj.embed.fields.push({ name: 'presence', value: guildMember.presence.status, inline: false });
            for (const activity of guildMember.presence.activities) {
                obj.embed.fields.push({ name: 'presence', value: activity.name, inline: false });
            }
            obj.embed.fields.push({ name: 'joinedAt', value: guildMember.joinedAt.toString(), inline: false });
            obj.embed.fields.push({ name: 'time since joined', value: timeToStr(now - guildMember.joinedAt.getTime()), inline: false });
            msg.channel.send(obj);
        }).catch(e => {
            console.error(e);
            msg.channel.send(obj);
        });
    });
}