const express = require('express');
const router = new express.Router();

// This is a test rest service.
router.get('/test', (req, resp) => {
    resp.send('This is another test 7');
});

module.exports = router;
