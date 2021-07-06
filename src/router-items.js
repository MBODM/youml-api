import express, { response } from 'express';


import * as config from './config.js';
import * as repo from './repo.js';
import * as youtube from './youtube.js';


const router = express.Router();

router.get('/v1/items', async (req, res, next) => {
    try {
        const items = await repo.getItems();
        res.json(items);
    }
    catch (error) {
        return next(error);
    }
});

router.get('/v1/items/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await repo.getItem(id);
        if (!item) {
            return res.status(404).json({ error: `Item with given id (${id}) not exists.` });
        }
        res.json(item);
    }
    catch (error) {
        return next(error);
    }
});

router.post('/items', async (req, res, next) => {
    try {
        if (!req.is('application/json')) {
            return res.status(415).json({ error: 'The Content-Type, given in request, is not supported.' });
        }
        const url = req.body?.url ?? undefined;
        if (url === undefined) {
            return res.status(400).json({ error: 'The JSON, given in request, contains no url.' });
        }
        if (!youtube.validateUrl(url)) {
            return res.status(400).json({ error: 'The url, given in request JSON, is not a valid youtube video url.' });
        }
        const item = await createItem(url);
        if (!validateItem(item)) {
            return res.status(500).json({ error: 'Could not create new item.' });
        }
        const success = await repo.addItem(item);
        if (!success) {
            return res.status(500).json({ error: 'Could not save new item.' });
        }
        const host = await config.getHost();
        const port = await config.getPort();
        const obj = {
            message: 'Item successfully created.',
            href: `http://${host}:${port}/v1/items/${id}`,
            item,
        };
        res.status(201).set('Location', `/v1/items/${id}`).json(obj);
    }
    catch (error) {
        return next(error);
    }
});

router.delete('/items/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const success = await repo.removeItem(id);
        if (!success) {
            return res.status(404).json({ error: `Item with given id (${id}) not exists.` });
        }
        res.json({ message: `Item with given id (${id}) successfully removed.`});
    }
    catch (error) {
        return next(error);
    }
});

async function createItem(url) {
    const id = youtube.getVideoId(url);
    if (id) {
        const title = await youtube.getVideoTitle(url);
        const thumbnail = youtube.getVideoThumbnailUrl(url);
        const date = new Date().toJSON();
        return { id, url, title, thumbnail, date };
    }
}

function validateItem(item) {
    return item &&
        item.id &&
        item.url &&
        item.title &&
        item.thumbnail &&
        item.date &&
        typeof item.id === 'string' &&
        typeof item.url === 'string' &&
        typeof item.title === 'string' &&
        typeof item.thumbnail === 'string' &&
        typeof item.date === 'string';
}

export { router as itemsRouter };