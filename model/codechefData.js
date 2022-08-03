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
    const name = $("h1.h2-style", html).text();

    // Extracting Rating
    const rating = $('.rating-number', html).text();

    // Extracting Global Rank
    const global_rank = $('.rating-ranks li:nth-child(1) a', html).text();;

    // Extracting Country Rank
    const country_rank = $('.rating-ranks li:nth-child(2) a').text();

    // Extracting Last Contest
    const last_contest = $('.contest-name a').text();

    // Extracting Highest Rating
    const highest_rating = $('.rating-header *:nth-child(5)').text().substring(16).replace(')','');

    // Extracting Profile Image URL
    const profile_image = $('.user-details-container img').attr('src');

    // Extracting Fully Solved Questions
    const fully_solved_count = $('.content h5:nth-child(1)').text().substring(14).replace(')', '');

    // Extracting Parttally Solved Questions
    const partially_solved_count = $('.content h5:nth-child(3)').text().substring(18).replace(')','');

    return { name, rating, global_rank, country_rank, last_contest, highest_rating, profile_image, fully_solved_count, partially_solved_count }

}