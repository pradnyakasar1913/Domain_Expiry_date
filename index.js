const moment = require("moment");
 
const whoisinfo = require("whois-json");
 
const bodyParser = require('body-parser')
 
var isValidDomain = require("is-valid-domain");
 
const express = require('express')
 
const app = express()
 
app.use(bodyParser.json())
 
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
 
app.get("/", (req, res) => {
  res.render("domainwhoisinfo",{ data: ""});
});
 
app.get("/domainagechecker", (req, res) => {
  res.render("domainagechecker", {
    title:
      "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
    data: "",
    flag: false,
    date: "",
    domainAge: "",
  });
});

app.post("/domainwhoisinfo", async (req, res) => {
    var domain = req.body.domain;
   console.log(domain)
    var results = await whoisinfo(domain);
   console.log(results)
   res.render("domainwhoisinfo",{data: response});
    var date = moment(results.creationDate).format("YYYY-MM-DD");
    var currentDate = moment(new Date()).format("YYYY-MM-DD");
   
    console.log(date);
    console.log(currentDate);
   
    var a = moment(date);
    var b = moment(currentDate);
   
    var years = b.diff(a, "year");
    a.add(years, "years");
   
    var months = b.diff(a, "months");
    a.add(months, "months");
 
    var days = b.diff(a, "days");
   
    var domainAge = years + " years " + months + " months " + days + " days";
   
    console.log(years);
    console.log(months);
    console.log(days);
   
    //console.log(year + "-" + month + "-" + dt);
   
    res.render("domainwhoisinfo", {
      title:
        "Whois Lookup Info Domain Availability & Registrar Checker - FreeMediaTools.com",
      data: results,
      flag: true,
      date: date,
      domainAge: domainAge,
    });
  });
   
  
  
  app.post("/domainagechecker", async (req, res) => {
    var domain = req.body.domain;

    console.log(domain)
   if(isValidDomain(domain)) {
    var results = await whoisinfo(domain);
   console.log(results)
   
    var date = moment(results.creationDate).format("YYYY-MM-DD");
    var currentDate = moment(new Date()).format("YYYY-MM-DD");
   
    console.log(date);
    console.log(currentDate);
   
    var a = moment(date);
    var b = moment(currentDate);
   
    var years = b.diff(a, "year");
    a.add(years, "years");
   
    var months = b.diff(a, "months");
    a.add(months, "months");
   
    var days = b.diff(a, "days");
   
    var domainAge = years + " years " + months + " months " + days + " days";
   
    console.log(years);
    console.log(months);
    console.log(days);
   
    //console.log(year + "-" + month + "-" + dt);
   
    res.render("domainagechecker", {
      title:
        "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
      data: results,
      flag: true,
      date: date,
      domainAge: domainAge,
    });
}
else{
    res.send('jshj')
}
  });
 
app.listen(5000)
console.log("app listening on port 5000")