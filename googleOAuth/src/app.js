import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import morgan from "morgan";

const app = express();

app.use(passport.initialize());
app.use(morgan("dev"));
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (_, __, profile, done) => {
            done(null, profile);
        },
    ),
);

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
        console.log(req.user);
        res.send("Authentication successful");
    },
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
