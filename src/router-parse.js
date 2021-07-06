import express from 'express';

const router = express.Router();

router.get('/v1/parse', (req, res) => {
    res.json({ name: 'parse' });
});

export { router as parseRouter };


router.get('/parse', async ctx => {
    ctx.status = 400;
    if (ctx.query) {
        const item = await youtube.parseUrl(ctx.query.url);
        if (item) {
            ctx.status = 200;
            ctx.body = item;
        }
    }
});