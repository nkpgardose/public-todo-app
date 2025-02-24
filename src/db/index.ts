import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

/**
 * @description
 * The client instance that is used to interact with the LibSQL API.
 * NOTE: You can also connect to a local SQLite file by passing file: instead of
 * a URL when using Node.js, learn more
 * https://docs.turso.tech/local-development#sqlite
 */
const turso = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export const database = drizzle(turso);
