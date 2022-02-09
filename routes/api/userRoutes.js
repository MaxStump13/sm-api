const router = require("express").Router();
const {
	getUsers,
	getSingleUser,
	createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// need update/delete
// add friends post/delete route at/friends/:friendID

module.exports = router;
