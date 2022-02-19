const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        scrapedData['Travel'] = await pageScraper.scraper(browser, 'Travel');
        scrapedData['historicalFiction'] = await pageScraper.scraper(browser, 'Historical Fiction');
        scrapedData['Mistery'] = await pageScraper.scraper(browser, 'Mistery')
        await browser.close();
        fs.writeFile('result/data.json', JSON.stringify(scrapedData), 'utf-8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log('The data has been scraped and data saved successfully!')
        });

        console.log(scrapedData);
    } catch (err) {
        console.log('Could not resolve the browser instance => ', err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);