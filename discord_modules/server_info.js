const {timeToStr} = require('time-str');

module.exports = (msg) => {
    if (!msg.guild) {
        console.log('guild not found');
        return;
    }
    const guild = msg.guild;
    let channelCount = 0;
    for (const _ of guild.channels.cache) {
        channelCount++;
    }
    const now = new Date().getTime();
    const timeStr = timeToStr(now - guild.createdAt.getTime());
    const obj = {
        embed: {
            fields: [
                { inline: false, name: 'name', value: guild.name,                           },
                { inline: false, name: 'id', value: guild.id,                               },
                { inline: false, name: 'region', value: guild.region.toString(),            },
                { inline: false, name: 'createdAt', value: guild.createdAt.toString(),      },
                { inline: false, name: 'time since created', value: timeStr,                },
                { inline: false, name: 'owner', value: guild.owner.toString(),              },
                { inline: true,  name: 'memberCount', value: guild.memberCount.toString(),  },
                { inline: true,  name: 'channelCount', value: channelCount.toString(),      },
            ],
        }
    };
    if (!!guild.iconURL) {
        obj.embed.thumbnail = {
            url: guild.iconURL,
        }
    }
    msg.channel.send(obj);
}