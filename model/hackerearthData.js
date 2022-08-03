// Problem with Hackerearth and Axios

const cheerio = require('cheerio');
const fs = require('fs');
var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())

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
    // fs.writeFileSync('new.html', html);
    // Extracting Name
    // $("h1.h2-style", html).each(function () {
    //     name = $(this).text();
    // })
    name = $(".left .name", html).text();

    // Extracting Rating
    // $(".rating-number", html).each(function () {
    //     rating = $(this).text();
    // })
    console.log($(".left", html).text())
    console.log($(".metric .value").html())
    rating = $(".right .contest-ratings .metric .value", html).text();

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