import 'dotenv/config';
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import connectEnsureLogin from "connect-ensure-login";
import { MessagingResponse } from('twilio').twiml;
// import Metaphor from 'metaphor-node';
// const metaphor = new Metaphor(process.env.METAPHOR_KEY);

// const __dirname = path.resolve();
const app = express();
const corsOptions = { origin: `http://localhost:3000`, credentials: true};
// const metaphor = new Metaphor(process.env.METAPHOR_KEY);

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'fillersecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24*60*60*1000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("mongoDB connected successfully")
}).catch(err => {
    console.log(err);
})

import User from "./models/userModel.js";
import PastView from './models/pastView.js';
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/getUser", (req, res) => {
    res.send(req.user);
})

app.get("/api/getArticles", async (req, res) => {
    let pref = "computer science";
    // User.findOne({_id: req.user._id}).then((data) => {
    //     console.log(data);
    //     pref = data.preferences;
    // });
    const boundDate = new Date().getDate() - 7;
    // const response = await metaphor.search(`find informational current event articles about ${pref}`, {
    //     numResults: 7, 
    //     startPublishedDate: boundDate
    //   });
    //   console.log(response);
    //   return response;
})

app.get("/api/getSimilarLast", async (req, res) => {
    let lastClick;
    PastView.findOne({_id: req.user._id}).then((data) => {
        if(data.views.length > 0) {
            lastClick = data.views[data.views.length-1];
        } else {
            lastClick = false;
        }
    })
    console.log(lastClick)
    if(lastClick != false) {
        const response = await metaphor.findSimilar(lastClick, {
            numResults: 5
        });
        console.log(response)
        return response;
    } else {
        return {};
    }
})


app.get("/api/home", (req, res) => {
    res.json({message: "Hello World"});
})

app.post("/api/newUser", (req, res) => {
    console.log("new user!")
    console.log(req.body);
    // const email = req.body.email;
    // const fName = req.body.firstName;
    // const lName = req.body.lastName;
    // const number = req.body.number;
    // const preferences = req.body.preference;

    const newUser = new User({
        username: req.body.username,
        number: req.body.number,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        preferences: req.body.preference
    });

    console.log(newUser);
    console.log(req.body.username);

    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            console.log(user);
            console.log("couldn't register")
            res.send(err.message);
        } else {
            console.log(user.number);
            console.log("registered");
            passport.authenticate("local", {failureMessage: true})(req, res, function() {
                console.log("authenticated");
            })

            console.log(req.isAuthenticated());
            res.send(user);
            // const newViews = new PastView({
            //     id: user._id,
            //     presented: [],
            //     views: []
            // });
            // PastView.create(newViews);
        }
    })
})

app.post("/api/login", passport.authenticate('local', {failureMessage: true}), (req, res) => {
    console.log("successful authentication/login")
    console.log(req.user)
    res.send(req.user);
})

app.listen(process.env.PORT, (req,res) => {
    console.log("server started on port " + process.env.PORT);
})