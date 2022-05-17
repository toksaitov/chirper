import dotenv from 'dotenv';
dotenv.config();

let dbName = process.env.DB_NAME;
if (!dbName) {
    dbName = 'chirper_db';
    console.warn(`The DB_NAME parameter was not set. The default value '${dbName}' was used.`);
}

let dbUser = process.env.DB_USER;
if (!dbUser) {
    dbUser = 'chirper_db_user';
    console.warn(`The DB_USER parameter was not set. The default value '${dbUser}' was used.`);
}

const dbPass = process.env.DB_PASS;
if (!dbPass) {
    throw new Error('The DB_PASS parameter MUST be set.');
}

let dbHost = process.env.DB_HOST;
if (!dbHost) {
    dbHost = 'localhost';
    console.warn(`The DB_HOST parameter was not set. The default value '${dbHost}' was used.`);
}

let dbPort = process.env.DB_PORT;
if (!dbPort) {
    dbPort = '3306';
    console.warn(`The DB_PORT parameter was not set. The default value '${dbPort}' was used.`);
}

let dbDialect = process.env.DB_DIALECT;
if (!dbDialect) {
    dbDialect = 'mysql';
    console.warn(`The DB_DIALECT parameter was not set. The default value '${dbDialect}' was used.`);
}

let dbReconnectTimeout = process.env.DB_RECONNECT_TIMEOUT;
if (!dbReconnectTimeout) {
    dbReconnectTimeout = 2000;
    console.warn(`The DB_RECONNECT_TIMEOUT parameter was not set. The default value '${dbReconnectTimeout}' was used.`);
}

let dbSessionHost = process.env.DB_SESS_HOST;
if (!dbSessionHost) {
    dbSessionHost = 'localhost';
    console.warn(`The DB_SESS_HOST parameter was not set. The default value '${dbSessionHost}' was used.`);
}

let port = process.env.PORT;
if (!port) {
    port = 8080;
    console.warn(`The PORT parameter was not set. The default value '${port}' was used.`);
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error('The SESSION_SECRET parameter MUST be set.');
}

const adminLogin = process.env.ADMIN_LOGIN;
if (!adminLogin) {
    throw new Error('The ADMIN_LOGIN parameter MUST be set.');
}

const adminPass = process.env.ADMIN_PASS;
if (!adminPass) {
    throw new Error('The ADMIN_PASS parameter MUST be set.');
}

export default {
    dbName,
    dbUser,
    dbPass,
    dbHost,
    dbPort,
    dbDialect,
    dbSessionHost,
    dbReconnectTimeout,
    port,
    sessionSecret,
    adminLogin,
    adminPass
};
