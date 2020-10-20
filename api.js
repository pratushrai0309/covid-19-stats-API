const express = require('express')
const covidCountry = require('./utils/covidData')
const covidTotal = require('./utils/covidTotal')
const covidContinent = require('./utils/covidContinent')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.port || 8080
const viewsPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/patials')
const staticPath = path.join(__dirname, '/static')

app.use('/static', express.static(staticPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
  res.render('index',{
    title: 'Covid 19 Stats API'
  })
})

app.get('about', (req, res) => {
  res.send('About Page')
})

app.get('/docs', (req, res) => {
  res.render('docs', {
    title: 'Docs'
  })
})

app.get('/api/v1/covid-19/country', (req, res) => {
  if(req.query.country){
    covidCountry(req.query.country, (error, {countrySearched,totalCases,todayCases,totalDeaths,totalRecovered,todayRecovered,activeCases,criticalCases,casesPerMillion,continent,test} = {}) => {
      if(error){
        res.send({
          error: error
        })
      }
      else{
        res.send({
          countrySearched: countrySearched,
          totalCases: totalCases,
          todayCases: todayCases,
          totalDeaths: totalDeaths,
          totalRecovered: totalRecovered,
          todayRecovered: todayRecovered,
          activeCases: activeCases,
          criticalCases: criticalCases,
          casesPerMillion: casesPerMillion,
          continent: continent,
          tests: test
        })
      }
    })
  }
  else{
    res.send({
     error: 'You should provide a country'
    })
  }
})

app.get('/api/v1/covid-19/total', (req, res) => {
  covidTotal((error, {countrySearched, totalCases, todayCases, totalDeaths, todayDeaths, totalRecovered, todayRecovered, activeCases, criticalCases, casesPerMillion, test} = {}) => {
    if(error){
      res.send({
        error: error
      })
    }
    else{
      res.send({
        countrySearched: countrySearched,
        totalCases: totalCases,
        todayCases: todayCases,
        totalDeaths: totalDeaths,
        todayDeaths: totalDeaths,
        totalRecovered: totalRecovered,
        todayRecovered: todayRecovered,
        activeCases: activeCases,
        criticalCases: criticalCases,
        casesPerMillion: casesPerMillion,
        tests: test
      })
    }
  })
})

app.get('/api/v1/covid-19/continent', (req, res) => {
  if(req.query.continent){
    covidContinent(req.query.continent, (error, {continent, totalCases, todayCases, totalDeaths, todayDeaths, totalRecovered, todayRecovered, activeCases, criticalCases, test, countryIncluded} = {}) => {
      if(error){
        res.send({
          error: error
        })
      }
      else{
        res.send({
          continent: continent,
          totalCases: totalCases,
          todayCases: todayCases,
          totalDeaths: totalDeaths,
          todayDeaths: todayDeaths,
          totalRecovered: totalRecovered,
          todayRecovered: todayRecovered,
          activeCases: activeCases,
          criticalCases: criticalCases,
          tests: test,
          countries: countryIncluded
        })
      }
    })
  }
  else{
    res.send({
      error: 'You should enter a continent'
    })
  }
})

app.get('*', (req, res) => {
  res.render('404page')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})  