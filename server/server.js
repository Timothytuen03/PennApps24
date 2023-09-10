import 'dotenv/config';
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import twilio from "twilio";
// import Metaphor from 'metaphor-node';
// const metaphor = new Metaphor(process.env.METAPHOR_KEY);

// import Metaphor from 'metaphor-node';
// const metaphor = new Metaphor(process.env.METAPHOR_KEY);

// const __dirname = path.resolve();
const app = express();
const corsOptions = { origin: `http://localhost:3000`, credentials: true};
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
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
    // let pref = "computer science";
    // console.log("user" + req.user)
    // User.findOne({_id: req.user._id}).then((data) => {
    //     console.log(data);
    //     pref = data.preferences;
    // });
    const boundDate = new Date().getDate() - 7;
    // const response = await metaphor.search(`find informational current event articles about ${pref}`, {
    //     numResults: 7, 
    //     startPublishedDate: boundDate
    //   });
    // //   console.log(response);
    //   return response;
    let keyword = "technology";
    // User.findOne({username: req.user.username}).then((data) => {
    //     keyword = data.preferences;
    // })

    const articleURL = `http://api.mediastack.com/v1/news?access_key=${process.env.ARTICLE_KEY}&keywords=${keyword}&limit=5`
    try {
        const response = await fetch(articleURL);
        const data = await response.json();
        console.log(data);
        if (data) {
            console.log(data.data);
            console.log("data");
            console.log(data.data[0]);
            res.send(data.data);
        } else {
            console.error('Error fetching news:', data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.send(error);
    }
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

app.post('/sms', (req, res) => {
    // const twiml = new MessagingResponse();
  
    // twiml.message('The Robots are coming! Head for the hills!');
  
    // res.type('text/xml').send(twiml.toString());
    client.messages
    .create({
        body: 'Here is your article of the day: ',
        from: '+18339460125',
        to: '+17326727245'
    })
    .then(message => console.log(message.sid));
    });

app.listen(process.env.PORT, (req,res) => {
    console.log("server started on port " + process.env.PORT);
})