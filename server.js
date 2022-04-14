/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import formBodyPlugin from 'fastify-formbody';
import pointOfView from 'point-of-view';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';

const app = fastify({ logger: false });
const root = path.dirname(new URL(import.meta.url).pathname);

app.register(fastifyStatic, {
  root: root,
  prefix: '/',
  setHeaders: (res) => {
    res.setHeader('x-allow-fledge', 'true');
    res.setHeader('Supports-Loading-Mode', 'fenced-frame');
  },
});
app.register(formBodyPlugin);
app.register(pointOfView, {
  engine: {
    handlebars: Handlebars,
  },
});

app.get('/', async (request, reply) => {
  const md = new MarkdownIt();
  const readme = await fs.promises.readFile('README.md', 'utf-8');
  const html = await fs.promises.readFile('index.html', 'utf-8');
  const body = md.render(readme);
  reply.type('text/html');
  reply.code(200).send(html + body);
});

app.get('/reporting', async (request, reply) => {
  const data = {
    date: new Date(),
    query: request.query,
    body: request.body,
  };
  const log = JSON.stringify(data) + '\n';
  console.log(log);
  await fs.promises.writeFile('./report.log', log, { flag: 'a' });
  reply.code(201).send('');
});

app.listen(process.env.PORT, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  app.log.info(`server listening on ${address}`);
});
