import express from 'express';
import { runScrapper } from './scrapper/scrapper.js';
import { runBuilder } from './builder/builder.js';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send('get');
  console.log(req.query);

  const builderJSON = await runScrapper(req.query.url);
  await runBuilder(builderJSON);
});

app.listen(port, async () => {
  const builderJSON = await runScrapper('http://neurosymptomsnew.kk5.org/');
  await runBuilder(builderJSON);
  console.log(`Node.js web server is running really fast at port ${port}..`);
});
