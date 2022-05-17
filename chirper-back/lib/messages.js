function messages(parameters, server, database) {
    server.post('/message/create', (request, response) => {
        if (!request.session.authorized) {
            response.status(401).end('Unauthorized');
            return;
        }

        const content = request.body.content;
        if (!content) {
            server.handleError(request, response, {
                'error': "The message can't be empty.",
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.create({
            content, 'userId': request.session.userID
        }).then(message => {
            response.format({
                'text/html': () => {
                    response.redirect('/');
                },
                'application/json': () => {
                    response.json({
                        'id': message.id,
                        'content': message.content,
                        'createdAt': message.createdAt,
                        'updatedAt': message.updatedAt,
                        'user': {
                            'id': request.session.userID,
                            'login': request.session.login
                        }
                    });
                }
            });
        }).catch(error => {
            if (error.name === 'SequelizeDatabaseError') {
                server.handleError(request, response, {
                    'error': "Incorrect message.",
                    'redirect': '/'
                });
            } else {
                console.error(error);
                response.status(503).end('Service Unavailable');
            }
        });
    });

    server.post('/message/:id/delete', (request, response) => {
        if (!request.session.authorized) {
            response.status(401).end('Unauthorized');
            return;
        }

        const id = request.params.id;
        if (!id) {
            server.handleError(request, response, {
                'error': "The message to be deleted was not specified.",
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                server.handleError(request, response, {
                    'error': "No message to delete.",
                    'redirect': '/'
                });
            } else if (!(request.session.administrator || request.session.userID === message.userId)) {
                response.status(401).end('Unauthorized');
            } else {
                return message.destroy().then(() => {
                    response.format({
                        'text/html': () => {
                            response.redirect('/');
                        },
                        'application/json': () => {
                            response.json(id);
                        }
                    });
                });
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });

    server.get('/message/:id/edit', (request, response) => {
        if (!request.session.authorized) {
            response.status(401).end('Unauthorized');
            return;
        }

        const id = request.params.id;
        if (!id) {
            server.handleError(request, response, {
                'error': "The message to be edited was not specified.",
                'redirect': '/'
            });
            return;
        }

        const Message = database.models.Message;
        Message.findOne({ 'where': { id } }).then(message => {
            if (!message) {
                server.handleError(request, response, {
                    'error': "No message to edit.",
                    'redirect': '/'
                });
            } else if (!(request.session.administrator || request.session.userID === message.userId)) {
                response.status(401).end('Unauthorized');
            } else {
                response.render('editMessage', { message, 'session': request.session });
            }
        }).catch(error => {
            console.error(error);
            response.status(503).end('Service Unavailable');
        });
    });

    server.post('/message/:id/edit', (request, response) => {
        if (!request.session.authorized) {
            response.status(401).end('Unauthorized');
            return;
        }

        const id = request.params.id;
        if (!id) {
            server.handleError(request, response, {
                'error': "The message to be edited was not specified.",
                'redirect': '/'
            });
            return;
        }

        const content = request.body.content;
        if (!content) {
            server.handleError(request, response, {
                'error': "The message can't be empty.",
                'redirect': `/message/${parseInt(id)}/edit`
            });
            return;
        }

        const Message = database.models.Message;
        const User = database.models.User;
        Message.findOne({ 'where': { id }, 'include': [{ 'model': User }]}).then(message => {
            if (!message) {
                server.handleError(request, response, {
                    'error': "No message to edit.",
                    'redirect': '/'
                });
            } else if (!(request.session.administrator || request.session.userID === message.userId)) {
                response.status(401).end('Unauthorized');
            } else {
                return message.update({ content }).then(message => {
                    response.format({
                        'text/html': () => {
                            response.redirect('/');
                        },
                        'application/json': () => {
                            response.json({
                                'id': message.id,
                                'content': message.content,
                                'createdAt': message.createdAt,
                                'updatedAt': message.updatedAt,
                                'user': {
                                    'id': message.user.id,
                                    'login': message.user.login
                                }
                            });
                        }
                    })
                    
                });
            }
        }).catch(error => {
            if (error.name === 'SequelizeDatabaseError') {
                server.handleError(request, response, {
                    'error': "Incorrect message.",
                    'redirect': `/message/${parseInt(id)}/edit`
                });
            } else {
                console.error(error);
                response.status(503).end('Service Unavailable');
            }
        });
    });
}

export default messages;
