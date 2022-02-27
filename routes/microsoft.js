const passport = require('passport');
const microsoftConfig = require('../config/microsoftConfig')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

class IndexRoute {
  constructor() {
    this.router = require("express").Router();
    this.middleware = require("../middleware");
    this.setRoutes();

    passport.serializeUser(function(user, done) {
      done(null, user.oid);
    });
    
    var routeClassObject = this
    passport.deserializeUser(function(oid, done) {
      routeClassObject.findByOid(oid, function (err, user) {
        done(err,user);
      });
    });
    
    // array to hold logged in users   
    passport.use(new OIDCStrategy({
        identityMetadata: microsoftConfig.creds.identityMetadata,
        clientID: microsoftConfig.creds.clientID,
        responseType: microsoftConfig.creds.responseType,
        responseMode: microsoftConfig.creds.responseMode,
        redirectUrl: microsoftConfig.creds.redirectUrl,
        allowHttpForRedirectUrl: microsoftConfig.creds.allowHttpForRedirectUrl,
        clientSecret: microsoftConfig.creds.clientSecret,
        validateIssuer: microsoftConfig.creds.validateIssuer,
        isB2C: microsoftConfig.creds.isB2C,
        issuer: microsoftConfig.creds.issuer,
        passReqToCallback: microsoftConfig.creds.passReqToCallback,
        scope: microsoftConfig.creds.scope,
        loggingLevel: microsoftConfig.creds.loggingLevel,
        nonceLifetime: microsoftConfig.creds.nonceLifetime,
        nonceMaxAmount: microsoftConfig.creds.nonceMaxAmount,
        useCookieInsteadOfSession: microsoftConfig.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: microsoftConfig.creds.cookieEncryptionKeys,
        clockSkew: microsoftConfig.creds.clockSkew,
      },
      function(iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
          return done(new Error("No oid found"), null);
        }
        // asynchronous verification, for effect...
        process.nextTick(function () {
          routeClassObject.findByOid(profile.oid, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              // "Auto-registration"
              routeClassObject.users.push(profile);
              return done(null, profile);
            }
            return done(null, user);
          });
        });
      }
      ));
    }
    
    findByOid(oid, fn) {
      for (var i = 0, len = this.users.length; i < len; i++) {
        var user = this.users[i];
        if (user.oid === oid) {
          return fn(null, user);
        }
      }
      return fn(null, null);
    }

  setRoutes(){

    /* Microsoft Login . */
    this.router.get(
      '/login',
      function(req, res, next) {
        passport.authenticate('azuread-openidconnect', 
          { 
            response: res,                      // required
            resourceURL: microsoftConfig.resourceURL,    // optional. Provide a value if you want to specify the resource.
            customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
            failureRedirect: '/' 
          }
        )(req, res, next);
      },
      function(req, res) {
        res.redirect('/index');
    });

    //login redirect

    this.router.post('/auth/openid/return',
    function(req, res, next) {
      passport.authenticate('azuread-openidconnect', 
        { 
          response: res,      // required
          failureRedirect: '/'  
        }
      )(req, res, next);
    },
    function(req, res) {
      res.redirect('/index');
    });
  }

}

const router = new IndexRoute();
module.exports = router.router;
