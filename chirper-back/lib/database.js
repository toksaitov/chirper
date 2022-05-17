import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

function databaseBuilder(parameters) {
    const connection = new Sequelize(
        parameters.dbName,
        parameters.dbUser,
        parameters.dbPass, {
        'host': parameters.dbHost,
        'port': parameters.dbPort,
        'dialect': parameters.dbDialect
    });

    const User = connection.define('user', {
        'login': {
            'type': Sequelize.STRING(64),
            'allowNull': false,
            'unique': true
        },
        'password': {
            'type': Sequelize.STRING(256),
            'allowNull': false
        },
        'administrator': {
            'type': Sequelize.BOOLEAN,
            'allowNull': false,
            'defaultValue': false
        }
    });

    const Message = connection.define('message', {
        'content': {
            'type': Sequelize.STRING(140),
            'allowNull': false
        }
    });

    User.hasMany(Message);
    Message.belongsTo(User);

    return {
        connection, 'reconnectTimeout': parameters.dbReconnectTimeout,

        'models': {
            User, Message
        },

        'start': async () => {
            await connection.sync();
            const hashedPass = bcrypt.hashSync(
                parameters.adminPass,
                bcrypt.genSaltSync(8)
            );
            return User.upsert({
                'login': parameters.adminLogin,
                'password': hashedPass,
                'administrator': true
            });
        }
    };
}

export default databaseBuilder;
