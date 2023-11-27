import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import passportJWT from "passport-jwt";
import { cartService, userService } from "../services/index.js";
import config from "./config.js";
import {
  createHash,
  isValidPassword,
  extractCookie,
  generateToken,
} from "../utils.js";


const LocalStrategy = local.Strategy;
const JWTStrategy = passportJWT.Strategy;
const JWTExtract = passportJWT.ExtractJwt;
const GitHubStrategy = github.Strategy;

function initializePassport() {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.CLIENT_ID_GITHUB,
        clientSecret: config.CLIENT_SECRET_GITHUB,
        callbackURL: config.CALLBACK_URL_GITHUB,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          const user = await userService.getUserByEmail(email);
          if (user) {
            console.log("User already exists " + profile._json.email);
            const token = generateToken(user);
            user.lastConnection = new Date();
            const id = user._id;
            await userService.updateUser(id, user);
            user.token = token;
            console.log(user, "user");
            return done(null, user);
          } else {
            const fullName = profile._json.name;
            const nameParts = fullName.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");
            const newUser = {
              first_name: firstName,
              last_name: lastName,
              email,
              age: profile._json.public_repos,
              password: "",
              cartId: {},
              rol: "user",
            };
            const result = await userService.createUser(newUser);
            const token = generateToken(result);
            result.token = token;
            return done(null, result);
          }
        } catch (e) {
          return done("Error logging in with Github. " + e);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: JWTExtract.fromExtractors([extractCookie]),
        secretOrKey: "secretForJWT",
      },
      (jwt_payload, done) => {
        return done(null, jwt_payload);
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, rol, email } = req.body;
          const user = await userService.getUserByEmail(username);
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newCartForUser = await cartService.createNewCart();
          const newUser = {
            first_name,
            last_name,
            age,
            rol,
            email,
            cart: newCartForUser._id,
            password: createHash(password),
          };
          const result = await userService.createUser(newUser);
          return done(null, result);
        } catch (e) {
          return done("Error registering: " + e);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          if (
            username == "adminCoder@coder.com" &&
            password == "adminCod3r123"
          ) {
            var mongoObjectId = function () {
              var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
              return (
                timestamp +
                "xxxxxxxxxxxxxxxx"
                  .replace(/[x]/g, function () {
                    return ((Math.random() * 16) | 0).toString(16);
                  })
                  .toLowerCase()
              );
            };
            const user = {
              _id: mongoObjectId,
              email: username,
              password,
              rol: "admin",
            };
            const token = generateToken(user);
            user.token = token;
            return done(null, user);
          }
          const user = await userService.getUserByEmail(username, true);
          if (!user) {
            console.error("User does not exist");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.error("Password is not valid");
            return done(null, false);
          }
          
          const token = generateToken(user);
          user.token = token;
        
          return done(null, user);
        } catch (error) {
          return done("Error logging in... " + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
   
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
  });
}

export default initializePassport;
