import "../dotenv.js";
import { Storage } from "@google-cloud/storage";

class FileController {
	constructor() {
		this.bucket = new Storage({
			keyFilename: "./gcs/gcs.json",
			projectId: process.env.GCS_PROJECT_ID,
		}).bucket(process.env.GCS_BUCKET_NAME);
	}

	listFiles = async (username) => {
		const [files] = await this.bucket.getFiles({
			prefix: `${username}/`,
		});

		const fileNames = files.map((file) => file.name);

		if (fileNames.length === 0) {
			await this.bucket.file(`${username}/`).save();
		}

		return fileNames;
	};

	downloadFile = (username, fileName) => {
		const blob = this.bucket.file(`${username}/${fileName}`);
		const blobStream = blob.createReadStream();

		return blobStream;
	};

	uploadFile = (username, file) => {
		const { originalname, buffer } = file;

		const blob = this.bucket.file(
			`${username}/${originalname.replace(/ /g, "_")}`,
		);
		const blobStream = blob.createWriteStream({
			gzip: true,
			resumable: false,
		});

		blobStream.end(buffer);
	};

	deleteFile = (username, fileName) => {
		this.bucket.deleteFiles(
			{
				prefix: `${username}/${fileName}`,
			},
			() => {},
		);
	};
}

export default FileController;
