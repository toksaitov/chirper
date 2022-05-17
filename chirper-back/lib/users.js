import bcrypt from 'bcryptjs';

function users(parameters, server, database) {
    server.get('/login', (request, response) => {
        response.render('login', { 'session': request.session });
    });

    server.post('/login', (request, response) => {
        const login = (request.body.login || '').trim();
        if (!login) {
            server.handleError(request, response, {
                'error': 'Login can not be empty.',
                'redirect': '/login'
            });
            return;
        }

        const password = (request.body.password || '').trim();
        if (!password) {
            server.handleError(request, response, {
                'error': 'Password can not be empty.',
                'redirect': '/login'
            });
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login } }).then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                request.session.authorized = true;
                request.session.userID = user.id;
                request.session.login = user.login;
                request.session.administrator = user.administrator;
                response.format({
                    'text/html': () => {
                        response.redirect('/');
                    },
                    'application/json': () => {
                        response.json({
                            'id': user.id,
                            'login': user.login,
                            'authorized': true,
                            'administrator': user.administrator
                        });
                    }
                });
            } else {
                server.handleError(request, response, {
                    'error': 'Failed to login.',
                    'redirect': '/login'
                });
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });

    server.get('/user', (request, response) => {
        response.format({
            'text/html': () => {
                response.redirect('/');
            },
            'application/json': () => {
                if (request.session.authorized) {
                    response.json({
                        'id': request.session.userID,
                        'login': request.session.login,
                        'authorized': request.session.authorized,
                        'administrator': request.session.administrator
                    });
                } else {
                    response.json(null);
                }
            }
        });
    });

    server.post('/logout', (request, response) => {
        request.session.regenerate(error => {
            if (error) {
                console.error(error);
            }

            response.format({
                'text/html': () => {
                    response.redirect('/');
                },
                'application/json': () => {
                    response.json(null);
                }
            });
            
        });
    });

    server.get('/register', (request, response) => {
        response.render('register', { 'session': request.session });
    });

    server.post('/register', (request, response) => {
        const login = (request.body.login || '').trim();
        if (!login) {
            server.handleError(request, response, {
                'error': 'Login can not be empty.',
                'redirect': '/register'
            });
            return;
        }

        const password = (request.body.password || '').trim();
        if (!password) {
            server.handleError(request, response, {
                'error': 'Password can not be empty.',
                'redirect': '/register'
            });
            return;
        }

        const passwordRepeat = (request.body['password-repeat'] || '').trim();
        if (!passwordRepeat) {
            server.handleError(request, response, {
                'error': 'Password has to be repeated twice.',
                'redirect': '/register'
            });
            return;
        }

        if (password !== passwordRepeat) {
            server.handleError(request, response, {
                'error': 'Password are not the same.',
                'redirect': '/register'
            });
            return;
        }

        const User = database.models.User;
        User.findOne({ 'where': { login } }).then(user => {
            if (user) {
                server.handleError(request, response, {
                    'error': 'The login is occupied. Select anothe one.',
                    'redirect': '/register'
                });
            } else {
                const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
                return User.create({
                    'login': login,
                    'password': hashedPass,
                    'administrator': false
                }).then(user => {
                    request.session.authorized = true;
                    request.session.userID = user.id;
                    request.session.login = user.login;
                    request.session.administrator = user.administrator;
                    response.format({
                        'text/html': () => {
                            response.redirect('/');
                        },
                        'application/json': () => {
                            response.json({
                                'id': user.id,
                                'login': user.login,
                                'authorized': true,
                                'administrator': user.administrator
                            });
                        }
                    });
                });
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });
}

export default users;
