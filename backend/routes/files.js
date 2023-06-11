import "../dotenv.js";
import { Router } from "express";
import { pipeline } from "stream";
import { promisify } from "util";
import { auth } from "../middlewares/auth.middleware.js";
import { Storage } from "@google-cloud/storage";

const pipelineAsync = promisify(pipeline);

const bucketName = process.env.GCS_BUCKET_NAME;
const storage = new Storage({
	keyFilename: "./gcs/gcs.json",
	projectId: process.env.GCS_PROJECT_ID,
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

router.get("/download", async (req, res) => {
	try {
		const { file } = req.body;
		const [signedUrl] = await storage
			.bucket(bucketName)
			.file(file)
			.getSignedUrl({
				version: "v4",
				action: "read",
				expires: Date.now() + 15 * 60 * 1000, // 15 minutos
			});

		await fetch(signedUrl)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error("Erro ao acessar a URL de download do arquivo");
				}

				await pipelineAsync(response.body, res).catch((error) => {
					console.error(error);
					return res
						.status(500)
						.send({ error: 1, message: "Erro ao fazer o download do arquivo" });
				});
			})
			.catch((error) => {
				console.error(error);
				return res
					.status(500)
					.send({ error: 1, message: "Erro ao acessar a URL de download do arquivo" });
			});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao enviar a URL de download dos arquivos do GCS",
		});
	}
});

router.post("/upload", async (req, res) => {
	return res.status(201).send("Upload de arquivos para o GCS");
});

router.delete("/delete", async (req, res) => {
	return res.send("Deleta arquivos do GCS");
});

export default router;
