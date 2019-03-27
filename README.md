# Play Play FE
A Turing School pair project.

[PlayPlay](https://protected-fortress-76604.herokuapp.com)
![homepage](/.readme/home.jpg)

Contributors:
* Leah K Miller
* Mary Goodhart


# About Play Play FE

Around 98% of all single-trip journeys in the US are 50 miles or less in length. Despite the fact that almost all available EV’s have a range that exceeds 50 miles, many people don’t buy, consider, or use EV’s. We’re here to help change that, and to help current EV owners. Our app will help you find things to do within your EV’s range, and to top it off, we’ll help you find an EV charger near the place you’re going so you can charge up while you’re there. Once you’ve arrived to your destination or back home, you can log your trip on your dashboard, and see how much tailpipe carbon emissions you saved.

![trip log](/.readme/my_trips.jpg)

## Current Known Issues

*
*

## Learning Goals

*
*
*

![PlayPlay](/.readme/first_search.jpg)

## Getting Started && Prerequisites

*
*
*

###### Tests

*
*
*

```
git clone <github address>
```

### Installing

From your terminal, navigate into the Play_Play FE directory:

```
cd play_play_fe
```

Establish a database:

```
knex migrate:latest
```
```
knex seed:run
```
Start your server:

```
npm start
```

Open your browser (best functionality in Chrome).

`localhost:3000`

Welcome to our dev environment!

![PlayPlay](/.readme/ev_chargers.jpg)

## Testing

Your location should be the root directory of the project (`play_play`).

From the command line run `mocha --exit`
(This can take a moment)

`Green` is passing.
`Red` is failing.

We used `<whatever>` for testing.

## Examples


## Deployment

Our app is deployed on heroku at: [PlayPlay](https://protected-fortress-76604.herokuapp.com)

## Tech Stack

## Running the Server Locally

To see your code in action locally, you need to fire up a development server. Use the command:

```
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/` to run your application.


## GitHub Pages Setup


## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
