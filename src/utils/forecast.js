const request = require('request')
const forecast=(long, lat, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=af326ceb7b28178dddeb711a5db4f41a&query='+lat+','+ long
    //const url='http://api.weatherstack.com/current?access_key=af326ceb7b28178dddeb711a5db4f41a&query=37.8267,-122.4233&units=f'  
    request({url, json:true}, (error, { body})=>{
          if(error){
                      callback("unable to connect", undefined);
                  }else if(body.error){
                      callback("unable to find the location", undefined);
                  }else{
                      callback(undefined,{
                          temprature: body.current.temperature,
                          feelslike:body.current.feelslike,
                          location:body.location.name
                      })
                  }
      })
  }
  module.exports =forecast