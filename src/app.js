import express from 'express';

import { infosRouter } from './router-infos.js';
import { itemsRouter } from './router-items.js';
import { parseRouter } from './router-parse.js';
import { errorRouter } from './router-error.js';

// import * as config from './config.js';

const app = express();

app.use(express.json);

app.use(infosRouter);
app.use(itemsRouter);
app.use(parseRouter);
app.use(errorRouter);

const host = await config.getHost();
const port = await config.getPort();

app.listen(port, host);
