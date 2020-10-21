const request = require('request')


/*
When the user search for a country 
it returns the all the data of the 
covid 19 in that country like total cases,
total deaths etc. ++++++
*/


const covidCountry = (country, callback) => {
  const url = `https://disease.sh/v3/covid-19/countries/${country}` 

  request({ url : url, json : true }, (error, {body} = {}) => {
    if(error){
      callback('Unable to connect to internet', undefined)
    }
    else if(body.message){
      callback('Country not found', undefined)
    }
    else{
      callback(undefined, {
        countrySearched: country,
        totalCases: body.cases,
        todayCases: body.todayCases,
        totalDeaths: body.deaths,
        todayDeaths: body.todayDeaths,
        totalRecovered: body.recovered,
        todayRecovered: body.todayRecovered,
        activeCases: body.active,
        criticalCases: body.critcal,
        casesPerOneMillion: body.casesPerOneMillion,
        continent: body.continent,
        test: body.tests
      })  
    }
  })
}


module.exports = covidCountry

