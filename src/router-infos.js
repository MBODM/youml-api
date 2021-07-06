import express from 'express';

import * as infos from './infos.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const name = await infos.getAppName();
        const version = await infos.getAppVersion();
        if (req.accepts('json')) {
            return res.json({ name, version });
        }
        res.type('text/plain').send(`${name} ${version}`);
    }
    catch (error) {
        return next(error);
    }
});

export { router as infosRouter };