import multer from "multer";
import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import FileController from "../controllers/file.controller.js";

const MB = 1024 * 1024;

const router = Router();
// router.use(auth);

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 50 * MB,
	},
});

const fileController = new FileController();

router.get("/", async (req, res) => {
	try {
		const username = req.username;

		const fileNames = await fileController.listFiles(username);

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
		const { fileName } = req.body;
		const username = req.username;

		const fileDownloadStream = fileController.downloadFile(username, fileName);

		fileDownloadStream.pipe(res);
		fileDownloadStream.on("end", () => {
			res.end();
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao fazer download dos arquivos do GCS",
		});
	}
});

router.post("/upload", upload.single("file"), async (req, res) => {
	try {
		const file = req.file;
		const username = req.username;

		fileController.uploadFile(username, file);

		return res
			.status(200)
			.send({ error: 0, message: "Upload realizado com sucesso" });
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao enviar os arquivos para o GCS",
		});
	}
});

router.delete("/delete", async (req, res) => {
	try {
		const { fileName } = req.body;
		const username = req.username;

		fileController.deleteFile(username, fileName);

		return res
			.status(200)
			.send({ error: 0, message: "Arquivo removido com sucesso" });
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: 1,
			message: "Erro ao enviar a URL de remoção dos arquivos do GCS",
		});
	}
});

export default router;
