const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: '../config.env' });

const userSchema = new mongoose.Schema({
	name : {
		type:String,
		required:true
	 },
	email : {
		type:String,
		required:true
	 },
	 password : {
		type:String,
		required:true
	 },
	 date : {
        type:Date,
        default: Date.now	
	  },	
	  messages:[
	  {
		  name:{
			 type: String,
             required: true			 
		  },
		  email:{
			 type: String,
             required: true			 
		  },
		  message:{
			 type: String,
             required: true			 
		  }
	  }
	  ],
	  tokens : [{
		  token:{
		type:String,
		required:true
		  }
	 }],
    
});



// we are hashing the password (/register)
userSchema.pre('save', async function(next){
	console.log("now method pre");
	console.log('*****************');
	console.log(this);
	console.log('*****************');
	console.log(this.password)
	 console.log('this.password')
	 if(this.isModified('password')){
		 this.password = await bcrypt.hash(this.password, 12);
		 console.log(this.password)
		 console.log('this.password')
	 }
	 console.log(this.password)
	 console.log('this.password')
	 console.log("now method pre");
	 next();
 })

userSchema.methods.generateAuthToken = async function() {
	try{
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		console.log('process.env.SECRET_KEY');
		console.log(process.env.SECRET_KEY);
		console.log("now method generateAuthToken ");
		console.log(token);
		console.log('---------------------------');
		console.log('&&&&&&&&&&&&&&&&&&');
	    console.log(this);
	    
		this.tokens = this.tokens.concat({ token: token });
		
		await this.save();
		console.log('&&&&&&&&&&&&&&&&&&& = '+ this.tokens + ' = &&&&&&&');
		return token;
	} catch (err){
	  console.log(err);	
	}	
}

// stored the message

userSchema.methods.addMessage = async function( name,email,message){
	try{
		this.messages = this.messages.concat({ name,email,message});
	    await this.save();
		return this.messages;
	} catch(error){
		console.log(error)
	}
	
}

// now we need to create a collections

const User = new mongoose.model("USER", userSchema);



module.exports = User;


