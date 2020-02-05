import scraperRoutes from './scraperRoutes';
import express from 'express';
const router = express.Router();

router.use('/api', scraperRoutes);

export default router;