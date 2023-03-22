const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController.js');

router.route('/').get(getAllUsers).post(createUser);

router 
.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// .get(getSingleUser)
// .put(updateUser)
// .delete(deleteUser);


module.exports = router;