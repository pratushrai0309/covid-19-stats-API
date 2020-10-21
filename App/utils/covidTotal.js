const request = require('request')

/*
Returns the total Covid cases in the world
and some useful information like total deaths,
total number of people recovered +++++
*/

const covidTotal = (callback) => {
  const url = 'https://disease.sh/v3/covid-19/all'
  
  request( { url : url, json : true}, (error, {body} = {}) => {
    if(error){
      callback('Unable to connect to interet', undefined)
    }
    else if(body.message){
      callback('To get the data of whole world you should use all')
    }
    else{
      callback(undefined, {
        countrySearched: 'all',
        totalCases: body.cases,
        todayCases: body.todayCases,
        totalDeaths: body.deaths,
        todayDeaths: body.todayDeaths,
        totalRecovered: body.recovered,
        todayRecovered: body.todayRecovered,
        activeCases: body.active,
        criticalCases: body.critcal,
        casesPerOneMillion: body.casesPerOneMillion,
        test: body.tests
      })
    }
  })
}

module.exports = covidTotal