// Use lazy loading of the HTTP module only if we need to look up status codes
var http;


var HTTPError = module.exports = function HTTPError(status, message, properties) {
  // Make sure we're using the 'new' keyword
  if (!(this instanceof HTTPError)) return new HTTPError(status, message);

  // Do the argument shuffle. If a status code is given but no message, look up
  // the message from the Node.js HTTP module
  if (typeof status !== 'number') {
    message = status;
    status = null;
  } else {
    if (typeof message === 'undefined') {
      if (!http) { http = require('http'); }
      message = http.STATUS_CODES[status];
    }
  }

  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor);

  // Setup error details
  this.name = this.constructor.name;
  this.status = this.statusCode = status || 500;
  this.message = message || '';
  Object.assign(this, properties);
};


// Set up inheritance
HTTPError.prototype = Object.create(Error.prototype);
HTTPError.prototype.constructor = HTTPError;


// Formatting for error message
HTTPError.prototype.toString = function() {
  return this.name + ': ' + this.status + ' ' + this.message;
};
