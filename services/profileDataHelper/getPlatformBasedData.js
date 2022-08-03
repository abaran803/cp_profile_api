const codechefModel = require('../../model/codechefData');
const codeforcesModel = require('../../model/codeforcesData');
const geeksforgeeksModel = require('../../model/geeksforgeeksData');
const hackerearthModel = require('../../model/hackerearthData');
const leetcodeModel = require('../../model/leetcodeData');
const spojModel = require('../../model/spojData');

// Input: Platform Name, HTML content
// Output: object, containing the user profile data
module.exports = (platform, html) => {

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