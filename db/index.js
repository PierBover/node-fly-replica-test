import postgres from 'postgres'

export const clientReplica = postgres(process.env.DATABASE_URL_REPLICAS);

export async function getProducts () {
	const result = await clientReplica`select * from "Products";`;
	return result;
}

process.once('SIGTERM', () => {
	clientReplica.end();
});