module.exports = {
  "DATABASE_URI": "postgres://user@localhost:5432/downtime",
  "SESSION_SECRET": "This application is to show productivity and time management, as well as many other features",
  "STRIPE_SECRET": "sk_test_LyyXldOR2kvRUNA8znXpvA9j",
  "TWITTER": {
    "consumerKey": "gCNs6EGmC6Z7s3uvIYl7dL0LO",
    "consumerSecret": "kvRcyQhInbmc3dXZjD78L1hHN46SYbncXkDeEdyexMYZt2oj6S",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "251647528530134",
    "clientSecret": "b96c0d9137cbc749d3aedeb0ee04a582",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "255117183192-40hrbtnr8tmemvujfpv6b0hf695ha8q8.apps.googleusercontent.com",
    "clientSecret": "q2dxjpAsKOT3E-eNU9GT09J2",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};