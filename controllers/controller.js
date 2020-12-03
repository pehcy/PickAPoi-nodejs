const placeOfInterst = require('../models/placeOfInterest');

exports.create = function(req, res) {
  var newPlace = new placeOfInterst({ name: req.body.poi.category.trim(), place: req.body.poi.place});
  console.log(req.body.poi);
  newPlace.save( err => {
    if(err) {
      res.status(400).send('Unable to save to database' + err);
    }
    else {
      console.log('Successfully save into mongoDB!');
      res.redirect('/input');
    }
  });
};
