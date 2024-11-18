const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")
require('dotenv').config()

// const HttpError = require("./models/http-error");
// const seeds = require("./seeds");
const port = process.env.PORT || 8000;

const APIGameRoutes = require('./routes/games-routes')
const APIBowlerRoutes = require('./routes/bowlers-routes');
const APITeamStatsRoutes = require('./routes/team-stats-routes');
const APIBeerFrameRoutes = require('./routes/beer-frame-routes');

app.use(bodyParser.json());

// seeds.seedBowlers(); // seed the bowlers
// seeds.seedGames(); // seed the games

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.use('/api/games', APIGameRoutes);
app.use('/api/bowlers', APIBowlerRoutes);
app.use('/api/teamstats', APITeamStatsRoutes);
app.use('/api/beerframes', APIBeerFrameRoutes);

app.use(express.static(path.join(__dirname, "client", "build")));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose
    .connect(process.env.MONGODB_URI || `mongodb+srv://bowlingstats:BrooklynDodgers@bowlingstats.qc1cy.mongodb.net/bowlingstats?retryWrites=true&w=majority`, { //mongodb://localhost:27017/bowlingSite
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port);
    })
    .catch(err => {
        console.log(err)
    });