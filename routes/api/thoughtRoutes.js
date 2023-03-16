const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers.js');

router.route('/').get(getAllThoughts).post(createThought);

router
.route(':/id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;