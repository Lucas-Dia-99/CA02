/*
    gpt.js -- Router for the transaction list
*/
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const gptItem = require('../models/gptItem');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const axios = require('axios')
require("dotenv").config()
const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  //prompt: "Hello world",
}, prompt);

const get_respURL = async (latlon) => {
    let url = 'https://api.openai.com/v1/engines/davinci-codex/completions'+ 'Bearer' + process.env.OPENAI_API_KEY
                latlon.y+","+latlon.x
    const response = await axios.get(url)
    return response.data.properties.forecast
  }

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

router.get('/gpt', isLoggedIn, (req,res,next) => {
    res.render('GPTS')
})

router.post('/gpt',
  isLoggedIn,
  async (req,res,next) => {
    console.log('getting response')
    res.locals.prompt = req.body.prompt
    res.locals.resp = await completion(req.body.prompt)
    res.render('resp')
}
)

module.exports = router;