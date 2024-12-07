const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

const checking = require('./config/prod');
console.log(checking.googleClientID);

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

// Use cookieSession BEFORE passport middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],          // Encryption key
  })
);

// Initialize Passport and use session support
app.use(passport.initialize());
app.use(passport.session());

// Import and use authentication routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
 //express will serve production assets
 app.use(express.static('client/build'));
 
 //express will serve the index.html file
 const path = require('path');
 app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','build','index.html'));
 });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
