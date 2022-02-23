const passport = require("passport");

const JWTStrategy = require("./strategies/jwt.strategy");

passport.use(JWTStrategy);
