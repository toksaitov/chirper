// Загрузка библиотек

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Подключаемся и наcтраиваем структуру базы данных через ORM систему

const sequelize = new Sequelize({
    'host'     : process.env.CHIRPER_DB_HOST,
    'port'     : process.env.CHIRPER_DB_PORT,
    'database' : process.env.CHIRPER_DB_NAME,
    'username' : process.env.CHIRPER_DB_USER,
    'password' : process.env.CHIRPER_DB_PASS,
    'dialect'  : 'mysql'
})

const User = sequelize.define('user', {
    'login' : {
        'type' : Sequelize.STRING,
        'allowNull' : false,
        'unique' : true
    },
    'password' : {
        'type' : Sequelize.STRING,
        'allowNull' : false
    }
})

const Chirp = sequelize.define('chirp', {
    'content' : {
        'type' : Sequelize.STRING,
        'allowNull' : false
    }
});

User.hasMany(Chirp)
Chirp.belongsTo(User)

// ---

// Настраиваем веб-сервер

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    'secret' : process.env.CHIRPER_SESSION_SECRET,
    'resave' : false,
    'saveUninitialized': true
}))
app.set('view engine', 'ejs')

// ---

// Задаем обработчики путей (роутинг) веб-сервера

app.get('/', (request, response) => {
    Chirp.findAll().then(chirps => {
        response.render('index', {
            'chirps' : chirps,
            'session' : request.session
        })
    }).catch(error => {
        console.error(error)
        response.status(500).end('Internal Server Error')
    })
})

app.post('/', (request, response) => {
    if (!request.session.authorized) {
        response.status(403).end('Forbidden')
        return;
    }

    Chirp.create({
        'content' : request.body.content,
        'userId' : request.session.userID
    }).then(chirp => {
        response.redirect('/')
    }).catch(error => {
        console.error(error)
        response.status(500).end('Internal Server Error')
    })
})

app.get('/login', (request, response) => {
    response.render('login', { 'session' : request.session })
})

app.post('/login', (request, response) => {
    const login = request.body.login
    const password = request.body.password

    User.findOne({ 'where' : { 'login' : login } }).then(user => {
        if (bcrypt.compareSync(password, user.password)) {
            request.session.authorized = true
            request.session.login = login
            request.session.userID = user.id
            response.redirect('/')
        } else {
            console.error('Invalid login attempt: invalid password for ' + login);

            request.session.error = 'Invalid login or password.'
            response.redirect('/login')
        }
    }).catch(error => {
        console.error(error)

        request.session.error = 'Invalid login or password.'
        response.redirect('/login')
    })
})

app.get('/logout', (request, response) => {
    request.session.regenerate(() => {
        response.redirect('/')
    })
})

app.get('/register', (request, response) => {
    response.render('register', { 'session' : request.session })
})

app.post('/register', (request, response) => {
    const login = request.body.login
    const password = request.body.password
    const passwordRepeat = request.body['password-repeat']

    if (!login) {
        console.error('Invalid registration attempt: empty login field')

        request.session.error = "The login can't be empty."
        response.redirect('/register')

        return;
    }
    if (!password) {
        console.error('Invalid registration attempt: empty password field')

        request.session.error = "The password can't be empty."
        response.redirect('/register')

        return;
    }

    User.findOne({ 'where' : { 'login' : login } }).then(user => {
        if (user) {
            console.error('Invalid registration attempt: user exists')

            request.session.error = 'This login has already been taken.'
            response.redirect('/register')

            return;
        }

        if (password !== passwordRepeat) {
            console.error('Invalid registration attempt: passwords don\'t match')

            request.session.error = 'Passwords do not match.'
            response.redirect('/register')

            return;
        }

        User.create({
            'login': login,
            'password': bcrypt.hashSync(password, 10)
        }).then(user => {
            request.session.authorized = true
            request.session.login = login
            request.session.userID = user.id
            response.redirect('/')
        })
    }).catch(error => {
        console.error(error)
        response.status(500).end('Internal Server Error')
    })
})

// ---

// Создаем структуру базы при помощи ORM и запускаем веб-сервер

sequelize.sync().then(() => {
    const port = process.env.CHIRPER_PORT
    app.listen(port, () => console.log(`The Chirper server is listening on port ${port}.`))
});

// ---
