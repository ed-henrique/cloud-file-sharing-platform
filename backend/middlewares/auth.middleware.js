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
			return res.status(403).send({ error: 1, message: "Token expirado" });
		}

		return next();
	} catch (error) {
		console.error(error);
		return res.status(403).send({ error: 1, message: "Token inválido" });
	}
}

async function oauth(req, res, next) {
	const payload = {
		iss: client_email,
		scope: "https://www.googleapis.com/auth/cloud-platform",
		aud: "https://oauth2.googleapis.com/token",
		exp: Math.floor(Date.now() / 1000) + 3600,
		iat: Math.floor(Date.now() / 1000),
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET);

	const response = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		body: JSON.stringify({
			grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
			assertion: token,
		}),
	});

	const data = await response.json();

	req.user_oauth_token = data.access_token;

	return next();
}

export { auth, oauth };
