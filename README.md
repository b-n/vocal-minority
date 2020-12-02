# Vocal Minority

An "App" to do some data analysis on tweets to try find the size and influence vocal
minorities have on conversations.

## Intent

Everyone has unconscious biases, and one of mine is the feeling that people of an
opposite political position are more vocal than people with the same political position
that I have. The idea behind this "app" is to make it easy to do some data collection en
masse to see how diverse and active two separate sides of the political spectrum are.

This could fail massively, or it could win massively, who knows!

## Structure

The app is broken into two sections, client and server.

The client is a React SPA which has the responsibility of showing supporters tweets in
context to grade whether the tweet shows a bias of a left or a right leaning supporter.
This data is sent to the server which collates, pools and aggregates the data.

The server is mostly responsible for handling the frontend requests, but also for pooling
and aggregating the data. Twitter APIs have limits which I do not want to go over, the
server is also responsibile for caching some results in order to display to more users
without having impact on the Twitter APIs.

## Privacy

The intent of this project is to not enable public querying of twitter users, however to
analyse the pool of users to see what they as a collective represent. If any information
needs to be removed, please email me and I shall remove it.
