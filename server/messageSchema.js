const mongoose = require( 'mongoose' );

var messageSchema = new mongoose.Schema({
	msg: String,
	createdOn: { type: Date, 'default': Date.now },
});

mongoose.model( 'Message', messageSchema );
