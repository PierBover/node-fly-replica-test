import Fastify from 'fastify';
import {getProducts} from "./db/index.js";

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const fastify = Fastify({
	logger: false
});

fastify.get('/', async function (request, reply) {
	console.time('query');

	const start = Date.now();
	const results = await getProducts();

	console.timeEnd('query');
	const totalTime = Date.now() - start;
	const response = `Total query time: ${totalTime}ms`;
	reply.send(response);
});


fastify.listen({port: PORT, host: HOST}, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
});