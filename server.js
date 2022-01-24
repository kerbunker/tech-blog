// connects to required packages and files
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// data for starting a new session
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// data for starting a new session
const fiveMin = 1000 * 60 * 5;
const sess = {
  secret: "this is a secret",
  cookie: { maxAge: fiveMin },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//creates a new session
app.use(session(sess));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// allows the use of handlebars for MVC functionality
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// starts the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
