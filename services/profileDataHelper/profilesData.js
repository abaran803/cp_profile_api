const getProfile = require('./getProfile');

module.exports = async (profiles) => {

    const profilesData = [];
    for (let i = 0; i < profiles.length; i++) {
        profilesData.push(await getProfile(profiles[i].id, profiles[i].platform));
    }

    return profilesData;

}