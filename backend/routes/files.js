import "../dotenv.js";
import { Router } from "express";
import { Storage } from "@google-cloud/storage";

const projectId = process.env.GCS_PROJECT_ID;
const bucketName = process.env.GCS_BUCKET_NAME;
const storage = new Storage({
    projectId,
});

const router = Router();

router.get("/", async (req, res) => {
	try {
		const { username } = req.body;
		const [files] = await storage.bucket(bucketName).getFiles({
			prefix: `${username}/`,
		});

        const fileNames = files.map((file) => file.name);

        if (fileNames.length === 0) {
            storage.bucket(bucketName).file(`${username}/`).save();
            return res.send({ error: 0, message: "Nenhum arquivo encontrado" });
        }

		return res.send({ error: 0, fileNames });
	} catch (error) {
		console.error(error);
		return res.send({error: 1, message: "Erro ao retornar os arquivos do GCS" });
	}
});

router.get("/download", async (req, res) => {
	return res.send("Download de arquivos do GCS");
});

router.post("/upload", async (req, res) => {
	return res.send("Upload de arquivos para o GCS");
});

router.delete("/delete", async (req, res) => {
	return res.send("Deleta arquivos do GCS");
});

export default router;
