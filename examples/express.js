/**
 * Note: This project does not include Express as dependency for a variety of
 * reasons. If you want to run this example, make sure that you've installed
 * express.
 */

var HTTPError = require('../');

var express = require('express');
var app = express();

/**
 * Route that generates an error
 */
app.get('/error', function(req, req, next) {
  var shouldError = true;
  if (shouldError) return next(new HTTPError(500, 'Error by design.'));
});

/**
 * Error logging
 */
app.use(function(err, req, res, next) {
  console.error(err);
  next(err);
});

/**
 * Error response
 */
app.use(function(err, req, res, next) {

  var output = {error: {
    message: err.message
  }}

  if (err instanceof HTTPError) {
    res.status(err.status);
    output.error.status = err.status;
  }

  res.send(output);
});

/**
 * Start app
 */
app.listen(2000);