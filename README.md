# Pretty HTTP Errors for Node

Ever wanted to build an API with Node and constantly had to either use blocks to return errors so you could attach a status code, or you just use one type of status code for all errors? Now you can throw your errors in just one line.

`npm install node-http-error`

[![Build Status](https://travis-ci.org/carsondarling/node-http-error.svg?branch=master)](https://travis-ci.org/carsondarling/node-http-errors)

## Example

```javascript
var HTTPError = require('node-http-error');
var app = require('express')();

app.get('/error', function(req, req, next) {
  return next(new HTTPError(500, 'Error by design.'));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status); // or use err.statusCode instead
  res.send(err.message);
});

app.listen(2000);
```

```shell
$ curl -i http://localhost:2000/error

HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-2476597395"
Date: Thu, 14 Aug 2014 17:51:07 GMT
Connection: keep-alive

Error by design.
```

## Features

- Treat it just like `Error`. `HTTPError`'s are throwable, have full stacktrace, and even print out their status code when they're thrown.
- Don't worry about accidentally forgetting the `new` operator, HTTPError works without it.
- Give it just the HTTP status code you want to return, and the error message is automatically generated.
- Assign extra properties to the error.

## Usage

#### `HTTPError(status, message, properties)`
Creates an error with the given status, message and properties. For example

       new HTTPError(404, 'Not found!', { path: '/something-missing' })

#### `HTTPError(status, message)`
Creates an error message with the given status and message.

#### `HTTPError(message)`
Creates an error message with the message and `500` as the status code (Internal Server Error).

#### `HTTPError(status)`
Creates an error message with the given status. The error message is looked up from the default Node HTTP module. For example, `HTTPError(404)` is equivalent to `HTTPError(404, 'Not Found')`.

The Node HTTP module is not loaded unless needed to lookup the error message.
