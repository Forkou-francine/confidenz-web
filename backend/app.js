const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Requete recue');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue !'});
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
    next();
});

module.exports = app;