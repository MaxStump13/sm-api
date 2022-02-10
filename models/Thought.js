
const {Schema, model, Types} = require('mongoose');
const moment = require("moment");

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		// Date: time,
		type: Date,
		default: Date.now,
        get: (createdAtFormat)=>moment(createdAtFormat).format('MMM DD, YYYY [at] hh:mm a' )
		// maybe include moment for formatting?
	}},
    {
	toJSON: {
		virtuals: true,
		getters: true,
	}},
);
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        // need min max length 1-280 char
    },
    createdAt: {
        // Date: time,
        type: Date,
        default: Date.now,
        get: (createdAtFormat)=>moment(createdAtFormat).format('MMM DD, YYYY [at] hh:mm a' )
        // maybe include moment for formatting?
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        // array of nested docs from reactionSchema
        reactionSchema
    ]},
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});
const Thought = model("thought", thoughtSchema);

module.exports = Thought;