import "../dotenv.js";
import { Router } from "express";
import { auth, oauth } from "../middlewares/auth.middleware.js";
import { Storage } from "@google-cloud/storage";

const projectId = process.env.GCS_PROJECT_ID;
const bucketName = process.env.GCS_BUCKET_NAME;
const storage = new Storage({
	projectId,
});

const router = Router();
router.use(auth);

router.get("/", async (req, res) => {
	try {
		const { username } = req.body;
		const [files] = await storage.bucket(bucketName).getFiles({
			prefix: `${username}/`,
		});

		const fileNames = files.map((file) => file.name);

		if (fileNames.length === 0) {
			storage.bucket(bucketName).file(`${username}/`).save();
			return res
				.status(200)
				.send({ error: 0, message: "Nenhum arquivo encontrado" });
		}

		return res.status(200).send({ error: 0, fileNames });
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao retornar os arquivos do GCS",
		});
	}
});

router.get("/download", oauth, async (req, res) => {
	try {
		const { file, user_oauth_token } = req.body;

		const url = `https://storage.googleapis.com/storage/v1/b/${encodeURI(
			bucketName,
		)}/o/${encodeURI(file)}?alt=media`;

		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${user_oauth_token}`,
			},
			mode: "cors",
			cache: "default",
		};

		return res.status(200).send({ error: 0, url, options });
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao enviar a URL de download dos arquivos do GCS",
		});
	}
});

router.post("/upload", oauth, async (req, res) => {
	return res.status(201).send("Upload de arquivos para o GCS");
});

router.delete("/delete", oauth, async (req, res) => {
	return res.send("Deleta arquivos do GCS");
});

export default router;
