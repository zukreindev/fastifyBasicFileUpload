const fastify = require('fastify')();
const fs = require('fs');
const path = require('path');

fastify.register(require('@fastify/multipart'), {
    limits: {
        fileSize: 1000000000, // For multipart forms, the max file size in bytes
    },
    attachFieldsToBody: true,
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/', // optional: default '/'
});

const uploadRoute = require('./routers/uploadRoute');

fastify.register(uploadRoute, { prefix: '/upload' });

fastify.listen({ port: 3000 }, (err) => {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
});
