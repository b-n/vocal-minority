# Vocal Minority Backend

A Ruby AWS Serverless project. Why ruby? Why not!

## Setup/Install

1. Clone
2. `bundle config set path 'vendor/bundle'`
3. `yarn run init`
4. Go!

### Deploy

1. `bundle install --standalone` Only needed if Gemfile has changed
2. `sls deploy`

## Routes

- [ ] `GET /tweet`
- [ ] `POST /tweet/{id}`
- [X] `GET /auth/token` IN PROGRESS
- [x] `GET /auth/urls`

## TODO

- [ ] Tests
- [x] Google oauth
- [ ] Twitter authorizer
- [ ] Twitter client (get userid etc)
- [ ] Twitter client (tweet methods)
- [ ] Auth endpoints
- [ ] Tweet endpoints
