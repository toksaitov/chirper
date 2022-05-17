import express from 'express';
import session from 'express-session';
import redis   from 'redis';
import connectRedis from 'connect-redis';
import moment  from 'moment';

function serverBuilder(parameters) {
    const server = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({
        'host': parameters.dbSessionHost
    });

    server.set('view engine', 'ejs');
    server.use(express.static('public'));
    server.use(express.json());
    server.use(express.urlencoded({ 'extended': true }));
    server.use(session({
        'store': new RedisStore({ 'client': redisClient }),
        'secret': parameters.sessionSecret,
        'resave': false,
        'saveUninitialized': true
    }));
    server.locals.moment = moment;
    server.handleError = (request, response, data) => {
        const error = data.error || 'Something went wrong';
        response.format({
            'text/html': () => {
                request.session.error = error;
                if (data.redirect) {
                    response.redirect(data.redirect);
                } else {
                    response.status(400).end('Bad Request');
                }
            },
            'application/json': () => {
                response.status(400).json({ error });
            }
        });
    };

    return server;
}

export default serverBuilder;
