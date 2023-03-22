const router = require('express').Router();
// Routes for CRUD
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



module.exports = router;