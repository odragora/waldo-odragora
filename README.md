# waldo-odragora

An application that parses EXIF data from an S3 storage.

The repo contains both backend and frontend parts of the app.

## Backend overview
###### Tech stack: Python 3, Django, Django Channels

An application that allow a client to open a WebSocket connection on ws://you-host-here/exif/ .
Once connection accepted, the application is waiting for a message with an image hash and, optionaly, an EXIF data key.
Using this data it makes an http request to the network storage, takes an image, parses EXIF data, deliver it to WebSocket user and saves it into PostgreSQL database. If a hash is already in the DB the data is taken from there instead of http request.

###### What do I need to have?

* **Python 3.5**
* **PostgreSQL**

###### How do I get set up?

* Open `backend/project/settings.py` file
    * Add your host into `ALLOWED_HOSTS` list *(line 29)*
    * Configure a PostgreSQL database  *(line 83)*
* Create a Python 3 based virtual env and `source` it
* `cd backend/`
* `pip install -r requirements.txt`
* `./manage.py runserver` (you can set host and port here as well, `localhost:8000` by default)

## Frontend overview
###### Tech stack: React, Redux, Semantic UI

An application that renders a form with *hash* and optional *key* fields, and a table for displaying results.
Once a user clicks *load* button, the application estabilishes a WebSocket connection with a backend, waits for a result and renders it as a table (or displaying an error message if something went wrong).

###### What do I need to have?

* **node**
* **npm** or **yarn**

###### How do I get set up?

* Open `frontend/src/reducers/exif/actions.js` file
    * Set the websocket URL host *(line 10)*
* `cd frontend/`
* `yarn install` or `npm install`
* `yarn start` or `npm start` — that will run a dev server and point your browser to **localhost:3000**

## Areas of possible improvement

* Backend
    * Set up an additional channel for getting an image from the store and processing it. Subscribe websocket users requesting the same image to the same channel (using django channels group), send them the result as soon as it is ready. That would help with concurrency management.
* Frontend
    * Better error messages
