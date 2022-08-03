// Problem with Leetcode and Axios

const cheerio = require('cheerio');
const fs = require('fs');

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
    $("h1.h2-style", html).each(function () {
        name = $(this).text();
    })
    name = $('.shadow-level3 .text-label-2 .text-label-1').text();

    // Extracting Rating
    $('.w-full', html).each(function() {
        rating = $('.ttext-label-1', html).text();
        console.log(rating);
    });
    rating = $('.shadow-level3 .text-label-2 .ttext-label-1').text();
    console.log($('.ttext-label-1', html).text());
    fs.writeFileSync('new3.html', html);
    // console.log(rating)

    // Extracting Global Rank
    $(".rating-number", html).each(function () {
        global_rank = $('.rating-ranks li:nth-child(1) a').text();;
    })

    // Extracting Country Rank
    $(".rating-number", html).each(function () {
        country_rank = $('.rating-ranks li:nth-child(2) a').text();
    })

    // Extracting Last Contest
    $(".rating-number", html).each(function () {
        last_contest = $('.contest-name a').text();
    })

    // Extracting Highest Rating
    $(".rating-number", html).each(function () {
        [...($('.rating-header *:nth-child(5)').text())].forEach(character => (character >= '0' && character <= '9') && (highest_rating += (character)));
    })

    // Extracting Profile Image URL
    $(".rating-number", html).each(function () {
        profile_image = $('.user-details-container img').attr('src');
    })

    // Extracting Fully Solved Questions
    $(".rating-number", html).each(function () {
        [...($('.content h5:nth-child(1)').text())].forEach(character => (character >= '0' && character <= '9') && (fully_solved_count += (character)));
    })

    // Extracting Parttally Solved Questions
    $(".rating-number", html).each(function () {
        [...($('.content h5:nth-child(3)').text())].forEach(character => (character >= '0' && character <= '9') && (partially_solved_count += (character)));
    })

    return { name, rating, global_rank, country_rank, last_contest, highest_rating, profile_image, fully_solved_count, partially_solved_count }

}