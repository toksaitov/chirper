import parameters from './lib/parameters.js';

import serverBuilder from './lib/server.js';
const server = serverBuilder(parameters);

import databaseBuilder from './lib/database.js';
const database = databaseBuilder(parameters);

import users from './lib/users.js'
users(parameters, server, database);

import messages from './lib/messages.js'
messages(parameters, server, database);

server.get(['/', '/messages'], (request, response) => {
    const Message = database.models.Message;
    const User = database.models.User;
    Message.findAll({
        'include': [{
            'model': User
        }]
    }).then(messages => {
        response.format({
            'text/html': () => {
                response.render('index', { messages, 'session': request.session, 'message': null });
            },
            'application/json': () => {
                const data = messages.map(message => {
                    return {
                        'id': message.id,
                        'content': message.content,
                        'createdAt': message.createdAt,
                        'updatedAt': message.updatedAt,
                        'user': {
                            'id': message.user.id,
                            'login': message.user.login
                        }
                    }
                });
                response.json(data);
            }
        });
    }).catch(error => {
        console.error(error);
        response.status(503).end('Service Unavailable');
    });
});

(function loop() {
    setTimeout(async () => {
        try {
            await database.start();

            server.listen(parameters.port, () => {
                console.log(`Chirper server is listening on port ${parameters.port}.`);
            });
        } catch (error) {
            console.error(error);
            console.error("Failed to connect. Trying again...");

            loop();
        }
    }, database.reconnectTimeout || 2000);
})();
