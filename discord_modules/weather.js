const weatherAPI = require('open-weather');

module.exports = (msg, args, client) => {
    const search = args.join(' ');
    let city;
    let country = '';
    if (search.indexOf('-') !== -1) {
        [city, country] = search.split('-');
    } else {
        city = search;
    }
    city = city.trim();
    country = country.trim();
    if (!city) {
        msg.channel.send(`weather <city>`);
    }
    
    weatherAPI(city, country).then(res => {
        if (res.hasOwnProperty('error')) {
            msg.channel.send(`can't find weather information for ${city}`);
        }
        const out = [];
        for (const o of Object.keys(res)) {
            out.push({
                name: o,
                value: res[o] || 'error',
                inline: true,
            });
        }
        if (res.hasOwnProperty('country')) {
            out.push({
                name: 'flag',
                value: `:flag_${res.country.toLowerCase()}:`,
                inline: true,
            })
        }
        msg.channel.send({
            embed: {
                fields: out,
            }
        }).catch(console.error);
    })
}