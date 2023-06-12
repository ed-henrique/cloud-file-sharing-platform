import "../dotenv.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

async function auth(req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: 1, message: "Token não informado" });
	}

	const [, token] = authorization.split(" ");

	try {
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		const currentTimestamp = Math.floor(Date.now() / 1000);
		if (decoded.exp < currentTimestamp) {
			return res.redirect("/logout");
		}

		req.username = decoded.username;

		return next();
	} catch (error) {
		console.error(error);
		return res.status(403).send({ error: 1, message: "Token inválido" });
	}
}

export { auth };
