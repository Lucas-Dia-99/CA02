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
console.log(process.env)
console.log(process.env.OPENAI_API_KEY)
console.log(configuration)

const openai = new OpenAIApi(configuration);

const get_resp = async (prompt) => {
                const completion = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: "Use the following as inspiration to write a shakesperean sonnet: " + prompt,
                  });
    return completion.data.choices[0].text
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
    res.locals.resp = await get_resp(req.body.prompt)
    res.render('resp')
}
)

module.exports = router;