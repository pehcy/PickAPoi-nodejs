const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/controller');

var poiModel = require('../models/placeOfInterest');

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', (req, res) => {
  res.render('index', {page: 'home'});
});

router.get('/input', (req, res) => {
  res.render('index', {page: 'input'});
});

router.post('/addPlace', (req, res) => {
  controller.create(req, res);
});

router.get('/pick', (req, res) => {
  // pipeline for aggregate grouping
  const poiResult = poiModel.aggregate([
    {$group: {_id: "$name", places: {$push: "$place"}}}
  ]).exec(
    function (err, result) {
      if (err) {
        console.log('Unable to perform aggregation: ' + err);
      }
      else {
        console.log(result);
        res.render('index', { page: 'pick', data: result });
      }
    }
  );
});

// randomly draw places from filtered categories
router.post('/getPOI', (req, res) => {
  console.log(req.body.filterOut);
  const drewResult = poiModel.aggregate([
    {$group: {_id: "$name", places: {$push: "$place"}}},
    {$match: {_id: {$ne: req.body.filterOut}}}
  ]).exec(
    function (err, result) {
      if (err) {
        console.log('Unable to perform aggregation: ' + err);
      }
      else {
        res.redirect('/pick');
        console.log(result);
        const listOfPlaces = result.map(p => p.places).flat();
        res.render('index', { 
          page: 'pick', 
          data: result, 
          chosenPOI: listOfPlaces[ Math.floor(Math.random() * listOfPlaces.length)]
        });
      }
    }
  );
});

module.exports = router;