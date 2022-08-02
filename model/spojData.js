const cheerio = require('cheerio');

module.exports = (html) => {

    // let name = '';
    // let rating = '';
    // let global_rank = '';
    // let country_rank = '';
    // let last_contest = '';
    // let highest_rating = '';
    // let profile_image = '';
    // let fully_solved_count = '';
    // let partially_solved_count = '';

    const $ = cheerio.load(html);

    // Extracting Name
    const name = $("#user-profile-left h3").text();

    // Extracting Global Rank
    const global_rank = $("#user-profile-left p", html).eq(2).text().substring(13);

    // Extracting Fully Solved Questions
    const fully_solved_count = $('.profile-info-data dd').eq(0).text();

    return { name, global_rank, fully_solved_count }

}