function uploadRoute(fastify, options, done) {
    fastify.post('/', async function (req, reply) {
        const data = req.body.video;
        const name = req.body.name; // Örnektir ve name.value ile erişebilirsiniz

        if (data.mimetype.split('/')[0] !== 'video' /**İstediğiniz türe göre ekleyin veyahut kaldırın */)
            return reply.send({
                success: true,
                message: 'invalid_file_type',
            });

        const fileName = `${name}.${data.mimetype.split('/')[1]}`;

        await fs.writeFileSync(`./uploads/${fileName}`, await data.toBuffer());

        reply.send();
    });

    fastify.get('/:slug', async function (req, reply) {
        if (!req.params.slug) {
            return reply.send({
                success: false,
                message: 'missing_slug',
            });
        } else {
            reply.sendFile(req.params.slug);
        }
    });

    done();
}

module.exports = uploadRoute;
