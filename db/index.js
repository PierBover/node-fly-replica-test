import createConnectionPool from '@databases/pg';
import {sql} from '@databases/pg';
import createCluster from '@databases/pg-cluster';

const primary = createConnectionPool(process.env.DATABASE_URL);
const replicas = [createConnectionPool(process.env.DATABASE_URL_REPLICAS)];

const db = createCluster.default(primary, replicas);

export async function getProducts () {
	const result = await db.query(
		sql`select * from "Products";`
	);

	return result;
}

process.once('SIGTERM', () => {
	db.dispose().catch((ex) => {
		console.error(ex);
	});
});