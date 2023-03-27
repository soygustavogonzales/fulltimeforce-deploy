var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
//const PORT = process.env.PORT || 3001

var commitsRouter = require('./routes/commits');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const frontFilesLocation = path.join(__dirname, 'ftf-app', 'build')
app.use(express.static(frontFilesLocation));
app.use('/api/getAllCommits', commitsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('*', async(req, res) => {
  res.sendFile(path.join(frontFilesLocation, 'index.html'))
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(PORT, () => console.log('server is running on ', PORT))
module.exports = app;
