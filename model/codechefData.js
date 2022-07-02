const cheerio = require('cheerio');

module.exports = (html) => {

    let name = '';
    let rating = '';
    let global_rank = '';
    let country_rank = '';
    let last_contest = '';
    let highest_rating = '';
    let profile_image = '';
    let fully_solved_count = '';
    let partially_solved_count = '';

    const $ = cheerio.load(html);

    // Extracting Name
    name = $("h1.h2-style", html).text();

    // Extracting Rating
    rating = $('.rating-number', html).text();

    // Extracting Global Rank
    global_rank = $('.rating-ranks li:nth-child(1) a', html).text();;

    // Extracting Country Rank
    country_rank = $('.rating-ranks li:nth-child(2) a').text();

    // Extracting Last Contest
    last_contest = $('.contest-name a').text();

    // Extracting Highest Rating
    [...($('.rating-header *:nth-child(5)').text())].forEach(character => (character >= '0' && character <= '9') && (highest_rating += (character)));

    // Extracting Profile Image URL
    profile_image = $('.user-details-container img').attr('src');

    // Extracting Fully Solved Questions
    [...($('.content h5:nth-child(1)').text())].forEach(character => (character >= '0' && character <= '9') && (fully_solved_count += (character)));

    // Extracting Parttally Solved Questions
    [...($('.content h5:nth-child(3)').text())].forEach(character => (character >= '0' && character <= '9') && (partially_solved_count += (character)));

    return { name, rating, global_rank, country_rank, last_contest, highest_rating, profile_image, fully_solved_count, partially_solved_count }

}