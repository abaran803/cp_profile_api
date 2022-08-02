const axios = require('axios').default;
const codechefModel = require('../model/codechefData');
const codeforcesModel = require('../model/codeforcesData');
const geeksforgeeksModel = require('../model/geeksforgeeksData');
const hackerearthModel = require('../model/hackerearthData');
const leetcodeModel = require('../model/leetcodeData');
const spojModel = require('../model/spojData');

// Input: Platform Name, HTML content
// Output: object, containing the user profile data
const getPlatformBasedData = (platform, html) => {

    let data;

    switch (platform.toLowerCase()) {

        case 'codechef':
            data = codechefModel(html);
            break;

        case 'codeforces':
            data = codeforcesModel(html);
            break;

        case 'hackerearth':
            data = hackerearthModel(html);
            break;

        case 'geeksforgeeks':
            data = geeksforgeeksModel(html);
            break;

        case 'leetcode':
            data = leetcodeModel(html);
            break;

        case 'spoj':
            data = spojModel(html);
            break;

    }

    return data;
}

// Input: Profile Name, Platform Name
// Output: object, containing the user profile data
const getProfile = async (profile, platform) => {

    var baseURL = '';
    var extras = '';

    switch (platform.toLowerCase()) {

        case 'codechef':
            baseURL = 'https://www.codechef.com/users/';
            break;

        case 'codeforces':
            baseURL = 'https://codeforces.com/profile/';
            break;

        case 'hackerearth':
            baseURL = 'https://www.hackerearth.com/@';
            break;

        case 'leetcode':
            baseURL = 'https://leetcode.com/';
            break;

        case 'spoj':
            baseURL = 'https://www.spoj.com/users/';
            break;

        case 'geeksforgeeks':
            baseURL = 'https://auth.geeksforgeeks.org/user/';
            extras = '/practice';
            break;

    }

    try {
        const rawData = await axios.get(`${baseURL}${profile}${extras}`)
        const data = getPlatformBasedData(platform, rawData.data);
        return { ...data, url: `${baseURL}${profile}${extras}` };
    } catch (err) {
        console.log(err)
        return { 'status': 'Some error occured' }
    }

}

// Input: Array of objects, containing profile and platform
// Output: Array of objects, containing the user profile data
module.exports = async (query) => {

    const profiles = [];
    for (let i = 0; i < query.length; i++) {
        profiles.push(await getProfile(query[i].profile, query[i].platform));
    }

    return profiles;

}