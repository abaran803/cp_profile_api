const cheerio = require('cheerio');
const fs = require('fs');

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
    const name = $("#detail1 .mdl-grid:nth-child(1) div:nth-child(2)", html).text();

    // Extracting Rating
    const rating = $("#detail1 .mdl-grid:nth-child(4) .mdl-cell > span", html).text().substring(24);

    // Extracting Profile Image URL
    const profile_image = $('.avatarDiv img').attr('src');

    // Extracting Fully Solved Questions
    const fully_solved_count = $("#detail1 .mdl-grid:nth-child(4) .mdl-cell:nth-child(2)", html).text().substring(17);

    return { name, rating, profile_image, fully_solved_count }

}