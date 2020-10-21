const request = require('request')

/*
It takes a name of a continent
and give us the latest Covid 19
stats in that conitent like total 
cases, deaths, recovered
*/

const covidContinent = (continent, callback) => {
    const url = `https://disease.sh/v3/covid-19/continents/${continent}`
    
    request({ url : url, json : true }, (error, {body} = {}) => {
      if(error){
        callback('Unable to connect to internet', undefined)
      }
      else if(body.message){
        callback('Unable to find the continent', undefined)
      }
      else{
        callback(undefined, {
        continent: continent,
        totalCases: body.cases,
        todayCases: body.todayCases,
        totalDeaths: body.deaths,
        todayDeaths: body.todayDeaths,
        totalRecovered: body.recovered,
        todayRecovered: body.todayRecovered,
        activeCases: body.active,
        criticalCases: body.critical,
        test: body.tests,
        countryIncluded: body.countries
      })
      }
    })
  
}

module.exports = covidContinent