const express = require('express');
const server = express();

const postsRouter = require('./routes/postsRouter');

server.use(express.json());
server.use('/api/posts', postsRouter);

server.listen(8000, () => console.log('port running on 8000'));
