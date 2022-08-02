const express = require('express')
const router = express.Router()
const getAllProfilesData = require('./actions/profilesData');
const platformFinder = require('./actions/platformSearch');

// Homepage
router.get('/', (req, res) => {

    res.send("Profile Visualizer");

})

// Get the information of single profile, using details in URL
router.post('/profileData', async (req, res) => {

    const profile = req.body.profile;
    const platform = req.body.platform;

    const query = [{ profile, platform }];

    const data = await getAllProfilesData(query);
    res.json(data);

})

// Extract the profiles data from all the available platforms
// One or more profile can be checked at a time using ?profiles
router.get('/check', async (req, res) => {

    // const data = await checkProfileExistence(req.query.id)
    const data = await platformFinder(req.query.id);
    res.json(data);

})

module.exports = router