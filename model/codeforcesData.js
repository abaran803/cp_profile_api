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
    const name = $(".main-info h1 a", html).text();
    
    // Extracting Rating
    const rating = $('.info li:nth-child(1) span:nth-child(2)', html).eq(0).text();
    
    // Extracting Highest Rating
    const highest_rating = $('.info li:nth-child(1) span:nth-child(3) span:nth-child(2)', html).text();
    
    // Extracting Profile Image URL
    const profile_image = $(".title-photo img").attr("src");
    
    // Extracting Fully Solved Questions
    const fully_solved_count = $("._UserActivityFrame_counterValue").eq(0).text();

    return { name, rating, highest_rating, profile_image, fully_solved_count }

}