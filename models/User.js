const {Schema, model} = require('mongoose');
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unqiue: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unqiue: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
			"Enter a valid email"]
			// need email validation
		},
		thoughts: [
			{
				// array of _id referencing Thoughts model
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [
			{
				// array of _id referencing User model
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

userSchema.virtual('friendCount').get(function(){
	return this.friends.length;
})

const User = model('user', userSchema);
module.exports = User;