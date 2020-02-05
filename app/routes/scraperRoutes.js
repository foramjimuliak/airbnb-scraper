import express from 'express';
import scrapeAirbnbListing from '../controllers/scraperController';

const router = express.Router();

const routes = {
    scrape: '/scrape/:listingId'
};

router.get(routes.scrape, scrapeAirbnbListing.scrape);

export default router;