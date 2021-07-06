import express from 'express';

const router = express.Router();

router.all('*', (req, res) => {
    const error = 'HTTP 404 Not Found';
    res.statusCode = 404;
    if (req.accepts('json')) {
        res.json({ error });
    }
    else {
        res.type('text/plain').send(error);
    }
});

export { router as errorRouter };