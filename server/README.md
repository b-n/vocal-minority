# Vocal Minority Backend

A Ruby AWS Serverless project. Why ruby? Why not!

## Setup/Install

1. Clone
2. `bundle config set path 'vendor/bundle'`
3. `yarn run init`
4. Go!

### Secrets

SSM is used for managing secrets. serverless-offline-ssm will load these from a file to make your
life easier.

The format is as follows:

```
/vocal-minority/[stage]/[variable name]=value
```

e.g.
```
/vocal-minority/dev/authCallbackUri=http://localhost:3001/auth/callback
/vocal-minority/dev/googleClientId=somegoogleclientid.apps.googleusercontent.com
/vocal-minority/dev/googleClientSecret=TheCorrospondingSecret
/vocal-minority/dev/jwtSecret=LiterallyAnythingHere
```

### Development

Assuming you've init'd correctly, an offline version can be run using:

`yarn run start`

This will run a serverless-offline instance with an offline dynamodb too. You shouldn't need to
deploy to the development stage, and all your code should be hot loaded. You can even use curl to
test the endpoints if you feel so inclined.

Note: The billed durations are in the ~5ms range in production, don't worry about the ~150ms
baseline when developing offline (I suspect it's the code reloading)

### Deploy

__Prerequisite:__ You may need to run `bundle install --standalone` if you have changed some gems

Otherwise it's as simple as:

`yarn run deploy:[dev|prod]`

One day CI will do this for you

## TODO

- [ ] Tests
- [x] Google oauth
- [ ] Twitter authorizer
- [ ] Twitter client (get userid etc)
- [ ] Twitter client (tweet methods)
- [ ] Auth endpoints
- [ ] Tweet endpoints
