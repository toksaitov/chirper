Chirper
=======

Chirper is a simple Twitter clone.

## Requirements

* Node.js (>= 13) with npm or yarn
* MySQL (>= 5.7)
* Redis (>= 5.0.8)

## Deployment Manually

Create an `.env` file with the following secrets and parameters.

```
# Server Parameter

PORT=8080                 # specify the server port (defaults to 8080)
SESSION_SECRET=           # specify the session secret to use with cookies (required)
ADMIN_LOGIN=              # specify the administrator's login (required)
ADMIN_PASS=               # specify the administrator's password (required)

# Database Parameters

DB_NAME=chirper_db        # specify the database name (defaults to chirper_db)
DB_USER=chirper_db_user   # specify the name of a database user (defaults to chirper_db_user)
DB_PASS=                  # specify the password to access the database (required)
DB_HOST=localhost         # specify the database host (defaults to localhost)
DB_PORT=3306              # specify the database port (defaults to 3306)
DB_DIALECT=mysql          # select the database dialect (mysql (default), mariadb, sqlite, postgresql, mssql)
DB_RECONNECT_TIMEOUT=2000 # time between db reconnection attempts (defaults to 2000)
DB_SESS_HOST=localhost    # specify the session database host (defaults to localhost)
```

Download libraries with `npm install` and start the server with `npm start`.

## Deployment through Docker

1. Install Docker and Docker Compose.
2. Create an `.env` file as described in 'Manual Deployment'.
3. Start the database container and the `chirper` container with `docker-compose up`.
4. For development environments to be able to modify files while the container
   is running, start the system with `docker-compose -f docker-compose.yml -f docker-compose.development.yml up`.
   Ensure to run `npm install` locally before starting the development containers.
   Ensure that the installed modules are compatible with the current Docker
   platform.

## Credits

Dmitrii Toksaitov <dmitrii@toksaitov.com>
