// Generate the list of all the platforms, where the profile is available
const axios = require('axios').default;
const cheerio = require('cheerio');

module.exports = async (profiles) => {

    const platformsContainingProfile = [];

    const isArray = Array.isArray(profiles);

    const checkForSingleProfile = async (profile) => {

        try {
            const response = await axios.get(`https://www.codechef.com/users/${profile}`)
            const html = response.data;
            const $ = cheerio.load(html);
            const status = $(".h2-style", html);
            status.each(function () {
                platformsContainingProfile.push({ id: profile, platform: 'Codechef' })
            });
        } catch (err) {
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

        try {
            const response = await axios.get(`https://codeforces.com/profile/${profile}`)
            const html = response.data;
            const $ = cheerio.load(html);
            const status = $(".main-info", html);
            status.each(function () {
                platformsContainingProfile.push({ id: profile, platform: 'Codeforces' })
            });
        } catch (err) {
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

        // HackerRank is not Working
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
            status.each(function () {
                platformsContainingProfile.push({ id: profile, platform: 'Hackerearth' })
            });
        } catch (err) {
            console.log(err)
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

        try {
            const response = await axios.get(`https://leetcode.com/${profile}`)
            const html = response.data;
            const $ = cheerio.load(html);
            const status = $(".shadow-level3", html);
            let isFound = false;
            status.each(function () {
                isFound = true;
            });
            if (isFound) {
                platformsContainingProfile.push({ id: profile, platform: 'Leetcode' })
            }
        } catch (err) {
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

        try {
            const response = await axios.get(`https://www.spoj.com/users/${profile}`)
            const html = response.data;
            const $ = cheerio.load(html);
            const status = $("#user-profile-left", html).find('h3').text();
            if (status) {
                platformsContainingProfile.push({ id: profile, platform: 'Spoj' })
            }
        } catch (err) {
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

        try {
            const response = await axios.get(`https://auth.geeksforgeeks.org/user/${profile}`)
            const html = response.data;
            const $ = cheerio.load(html);
            const status = $(".mdl-grid", html);
            let isFound = false;
            status.each(function () {
                isFound = true;
            });
            if (isFound) {
                platformsContainingProfile.push({ id: profile, platform: 'Geeksforgeeks' })
            }
        } catch (err) {
            console.log(err)
            // platformsContainingProfile.push({id: profile, status: "not found"})
        }

    }

    // Checking for single profile
    for(var i=0; i<profiles.length; i++) {
        const profile = profiles[i];
        await checkForSingleProfile(profile);
    }

    return platformsContainingProfile;

}