const express = require("express");
const app = express();
const fs = require('fs');

// Config fil
//const countries = require("./countries.json"); då behöver inte readFile()-metoden

app.use(express.json()); // Sparar datan i req.body


app.get('/countries', function (req, res) {

    fs.readFile("./countries.json", 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end();
        } else {
            let countries = JSON.parse(data); 
            const qs = req.query;
            let page = parseInt(qs.page);
            let size = parseInt(qs.size);
            let name = qs.name;

            if (!page) page = 1;
            if (!size) size = 20;

            if (name) {
                countries = countries.filter(country => {
                    return country.indexOf(name) !== -1;
                });
            }
            let result = countries.slice((page - 1) * size, page * size);

            res.json({ data: result });
        }
    });
});

// Miljövariabler (environment variables) 
// skriv i term => PORT=3003/'eller annat port' node script.js 
app.listen(process.env.PORT, () => {
    console.log(`Servidor inicializado-puerto ${process.env.PORT}`);
});