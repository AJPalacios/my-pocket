require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('./helpers/passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerPartial('nav',path.join(__dirname+'/views/partials'))
mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



//passport
app.use(session({
  store: new MongoStore({
    mongooseConnection:mongoose.connection,
    ttl:24*60*60
  }),
  secret:'my-pocket',
  resave:true,
  saveUninitialized:true,  
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set(hbs.registerPartials(__dirname + '/views/partials'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);


const auth = require('./routes/auth')
app.use('/', auth)

const users = require('./routes/users')
app.use('/users', users)

const ingresos = require('./routes/ingresos')
app.use('/ingresos', ingresos)

const gastos = require('./routes/gastos')
app.use('/gastos', gastos)

const ahorros = require('./routes/ahorros')
app.use('/ahorros', ahorros)

const diarios = require('./routes/diarios')
app.use('/diarios', diarios)

const metas = require('./routes/metas')
app.use('/metas', metas)

module.exports = app;
