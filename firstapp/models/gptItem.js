
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var GPTSChema = Schema( {
    prompt: String,
    createdAt: Date,
    userId: {type:ObjectId, ref:'user' }
})

module.exports = mongoose.model( 'gptItem', GPTSChema );