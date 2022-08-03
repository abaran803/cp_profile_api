const axios = require('axios');
const getPlatformBasedData = require('./getPlatformBasedData');

// Input: Profile Name, Platform Name
// Output: object, containing the user profile data
module.exports = async (profile, platform) => {

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