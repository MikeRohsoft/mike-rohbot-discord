const corona = require('corona');
module.exports = (msg, args) => {
    corona().then(res => {
        const [header, data] = res;
        const count = data.findIndex(a => a.country.toLowerCase() === args[0].toLowerCase());
        if (count === -1) {
            return msg.channel.send(`i can't find this country in my source`);
        }
        const obj = data[count];
        const array = [];
        for (const ele of Object.keys(obj)) {
            array.push({ name: header[ele], value: obj[ele] || '0', inline: true });
        }
        msg.channel.send({ embed: { fields: array } })
            .then(() => console.log(`send Corona Info from ${args[0]}`))
            .catch(e => console.error(`can't send Corona Info's from ${args[0]} ${e}`));
    });
};
