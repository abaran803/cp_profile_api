const axios = require('axios').default;
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const PORT = 3000;

// Generate the list of all the platforms, where the profile is available
const checkProfileExistence = async (profiles) => {

  const platformsContainingProfile = [];
  
  const isArray = Array.isArray(profiles);

  const checkForSingleProfile = async (profile) => {

    try {
      const response = await axios.get(`https://www.codechef.com/users/${profile}`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $(".h2-style", html);
      status.each(function() {
        platformsContainingProfile.push({id: profile, platform: 'Codechef'})
      });
    } catch(err) {
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }

    try {
      const response = await axios.get(`https://codeforces.com/profile/${profile}`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $(".main-info", html);
      status.each(function() {
        platformsContainingProfile.push({id: profile, platform: 'Codeforces'})
      });
    } catch(err) {
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }

    // try {
    //   console.log(`https://www.hackerrank.com/${profile}?hr_r=1`)
    //   const response = await axios.get(`https://www.hackerrank.com`)
    //   const html = response.data;
    //   console.log(html);
    //   const $ = cheerio.load(html);
    //   const status = $(".profile-heading", html);
    //   status.each(function() {
    //     platformsContainingProfile.push({id: profile, platform: 'Hackerrank'})
    //   });
    // } catch(err) {
    //   console.log(err);
    //   // platformsContainingProfile.push({id: profile, status: "not found"})
    // }
    
    try {
      const response = await axios.get(`https://www.hackerearth.com/@${profile}`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $(".personal-info", html);
      status.each(function() {
        platformsContainingProfile.push({id: profile, platform: 'Hackerearth'})
      });
    } catch(err) {
      console.log(err)
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }
    
    try {
      const response = await axios.get(`https://leetcode.com/${profile}`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $(".shadow-level3", html);
      let isFound = false;
      status.each(function() {
        isFound = true;
      });
      if(isFound) {
        platformsContainingProfile.push({id: profile, platform: 'Leetcode'})
      }
    } catch(err) {
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }
    
    try {
      const response = await axios.get(`https://www.spoj.com/users/${profile}/`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $("#user-profile-left", html).find('h3').text();
      if(status) {
        platformsContainingProfile.push({id: profile, platform: 'Spoj'})
      }
    } catch(err) {
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }

    try {
      const response = await axios.get(`https://auth.geeksforgeeks.org/user/${profile}`)
      const html = response.data;
      const $ = cheerio.load(html);
      const status = $(".mdl-grid", html);
      let isFound = false;
      status.each(function() {
        isFound = true;
      });
      if(isFound) {
        platformsContainingProfile.push({id: profile, platform: 'Geeksforgeeks'})
      }
    } catch(err) {
      console.log(err)
      // platformsContainingProfile.push({id: profile, status: "not found"})
    }

  }

  if(isArray) {

    // Checking all the profiles
    for(let i=0; i<profiles.length; i++) {
      await checkForSingleProfile(profiles[i]);
    }

  } else {

    // Checking for single profile
    await checkForSingleProfile(profiles);

  }
  
  return platformsContainingProfile;

}

// Input: Platform Name, HTML content
// Output: object, containing the user profile data
const getPlatformBasedData = (platform, html) => {

  let name = '';
  let rating = '';
  let global_rank = '';
  let country_rank = '';
  let last_contest = '';
  let highest_rating = '';
  let fully_solved_count = '';
  let partially_solved_count = '';
  const $ = cheerio.load(html);

  if(platform.toLowerCase() === 'codechef') {

    // Extracting Name
    $("h1.h2-style", html).each(function() {
      name = $(this).text();
    })

    // Extracting Rating
    $(".rating-number", html).each(function() {
      rating = $(this).text();
    })
    
  } else if(platform.toLowerCase() === 'codeforces') {



  }

  return {name, rating}
}

// Input: Profile Name, Platform Name
// Output: object, containing the user profile data
const getProfile = async (profile, platform) => {

  var baseURL = '';
  if (platform.toLowerCase() === 'codechef') {
    baseURL = 'https://www.codechef.com/users';
  }

  const rawData = await axios.get(`${baseURL}/${profile}`)
  const data = getPlatformBasedData(platform, rawData.data);

  return data;

}

// Input: Array of objects, containing profile and platform
// Output: Array of objects, containing the user profile data
const getAllProfiles = async (query) => {

  const profiles = [];
  for(let i=0; i<query.length; i++) {
    profiles.push(await getProfile(query[i].profile, query[i].platform));
  }

  return profiles;

}

// Homepage
app.get('/', (req, res) => {

  res.send("Profile Visualizer");

})

// Get the information of single profile, using details in URL
app.get('/:platform/:profile', async (req, res) => {

  const profile = req.params.profile;
  const platform = req.params.platform;

  const query = [{profile, platform}, {profile, platform}];
  
  const data = await getAllProfiles(query);
  res.json(data);

})

// Extract the profiles data from all the available platforms
// One or more profile can be checked at a time using ?profiles
app.get('/profiles', async (req, res) => {

  const data = await checkProfileExistence(req.query.id)
  res.json(data);

})

// Starting the server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})