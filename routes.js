const express = require('express')
const router = express.Router()
const getAllProfilesData = require('./services/profileDataHelper/profilesData');
const platformFinder = require('./services/platformFinderHelper/platformSearch');

// Homepage
router.get('/', (req, res) => {

    res.send("Profile Visualizer");

})

// Get the information of single profile, using details in URL
router.post('/profilesData', async (req, res) => {

    const profiles = req.body.profiles;
    const data = await getAllProfilesData(profiles);

    res.json({data: data});

})

// Extract the profiles data from all the available platforms
// One or more profile can be checked at a time using ?profiles
router.post('/check', async (req, res) => {

    // const data = await checkProfileExistence(req.query.id)
    const data = await platformFinder(req.body.profiles);
    res.json(data);

})

module.exports = router