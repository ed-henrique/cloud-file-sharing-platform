import "../dotenv.js";
import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth.middleware.js";
import user from "../models/user.model.js";
import { Op } from "sequelize";

const router = Router();
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/; // Contém 8~72 caracteres, 1 símbolo especial, 1 letra minúscula, 1 letra maiúscula e 1 número

router.post("/check", auth, async (req, res) => {
	try {
		if (req.username) {
			return res.send({ error: 0 });
		}

		return res.status(401).send({ error: 1, message: "Token inválido" });
	} catch (error) {
		console.error(error);
		return res.send({
			error: 1,
			message: "Erro ao criar conta",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await user.findOne({
			where: { [Op.or]: [{ username: { [Op.eq]: email } }, { email: { [Op.eq]: email } }] },
		});

		if (!existingUser) {
			return res
				.status(401)
				.send({ error: 1, message: "Usuário ou senha incorretos" });
		}

		const isMatch = await bcrypt.compare(password, existingUser.password);

		if (!isMatch) {
			return res
				.status(401)
				.send({ error: 1, message: "Usuário ou senha incorretos" });
		}

		const token = jwt.sign(
			{ username: existingUser.username, signedAt: Math.floor(Date.now() / 1000) },
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			},
		);

		return res.send({ error: 0, token });
	} catch (error) {
		console.error(error);
		return res.send({
			error: 1,
			message: "Erro ao fazer login",
		});
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingUser = await user.findOne({
			where: { [Op.or]: [{ username }, { email }] },
		});

		if (existingUser) {
			return res.status(400).send({ error: 1, message: "Usuário já existe" });
		}

		if (!passwordRegex.test(password)) {
			return res.status(400).send({
				error: 1,
				message:
					"Senha inválida. Ela deve conter 8~72 caracteres, 1 símbolo especial, 1 letra minúscula, 1 letra maiúscula e 1 número",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		await user.create({ username, email, password: encryptedPassword });

		const token = jwt.sign(
			{ username, signedAt: Math.floor(Date.now() / 1000) },
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			},
		);

		return res.send({ error: 0, token });
	} catch (error) {
		console.error(error);
		return res.send({
			error: 1,
			message: "Erro ao criar conta",
		});
	}
});

export default router;
