import * as requestPromise from 'request-promise';
import cheerio from 'cheerio';

function getNumber(value) {
    return Number(value.substr(0, value.indexOf(" ")))
}

/**
 * Author - Foram jimulia.
 * Accepts Listing Id from URL parameter.
 * Performs scraping from airbnb for that listing Id
 * Returns details like property name, capacity etc in JSON format
 */
const scrapeAirbnbListing = (req, res) => {

    const listingId = req.params.listingId;
    const baseUrl = 'https://www.airbnb.co.uk/rooms/';
  
    //fetch html through cheerio
    const options = {
        url: baseUrl + listingId + '?s=51',
        transform: function (body) {
            return cheerio.load(body);
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        timeout:15000
    }

    requestPromise.get(options).then(function($) {

        //scrape property name
        const summary = $('#summary');
        const name = summary.find("div[itemprop='name']");

        //scrape details like total capacity, beds, baths
        const mainContent = summary.next();
        const details = mainContent.find('div')
        .filter(function(i,el) {
            return this.children.length == 7
        }).find('span[aria-hidden!="true"]')
        .not(':has(span)');

        // create property object which returns all details
        const propertyDetails = {
            name: name.text(),
            capacity: getNumber(details.eq(0).text()),
            bedrooms: getNumber(details.eq(1).text()),
            beds: getNumber(details.eq(2).text()),
            baths: getNumber(details.eq(3).text()),
        }
        res.status(200).send(propertyDetails);


    })
    .catch(err => {
        console.log(err);
        throw 'Scrape failed'
    })
    
}
const scrapeAirbnb = {
    scrape: scrapeAirbnbListing
};

export default scrapeAirbnb;