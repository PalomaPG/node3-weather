const request = require('request')

const geocode = (address, callback) => {
    //const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicHBnMjAxMCIsImEiOiJja3gxNmhtN24xNHQ2MndvNjgyamQ1bXV6In0.DUFWyhB469kj-aEkgWCh2A&limit=1'

    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHBnMjAxMCIsImEiOiJja3gxNmhtN24xNHQ2MndvNjgyamQ1bXV6In0.DUFWyhB469kj-aEkgWCh2A&limit=1'

    request({url: geo_url, json: true}, (error, { body })=> {
        if (error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location search.', undefined)
        }else{
            const latlon = body.features[0].center
            callback(undefined, {
                
                latitude: latlon[1],
                 longitude: latlon[0],
                 location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode