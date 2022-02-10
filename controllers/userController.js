const User = require("../models/User");

module.exports = {
	getUsers(req, res) {
		User.find()
			.select("-__v")
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
    // thoughts and friends data in populate
	getSingleUser(req, res) {
        // console.log(req.params.userId);
		User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            // .populate(
            //     {
            //         path: "thoughts", select: "-__v",
            //     })
            // .populate(
            //     {
            //         path: 'friends', select: '-__v',
            //     })
			.select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: res.json(user)
			)
			.catch((err) => {
                res.status(500).json(err)
                console.log(err);
            });
	},
	// create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(500).json(err));
	},
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$set:req.body}, {new: true})
        .then((user)=>
            !user
				? res.status(404).json({ message: "No user with that ID" })
				: res.json(user)
			)
		.catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((user)=>{
            !user
				? (res.status(404).json({ message: "No user with that ID" }), console.log(`${user}`))
				: res.json(user)
            
        })
        .catch((err) => res.status(500).json(err));

    },
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        ).then((user)=>{
            res.json(user)
        }).catch((err)=> res.status(500).json(err));
    },
    deleteFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true, runValidators:true}
        ).then((user)=>{
            res.json(user)
        }).catch((err)=> res.status(500).json(err));
    },
    
};
