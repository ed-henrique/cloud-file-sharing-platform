import "../dotenv.js";

export const database = {
	dialect: "postgres",
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_NAME,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
};
