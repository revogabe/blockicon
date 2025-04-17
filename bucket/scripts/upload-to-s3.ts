/* ---------------------------*/
/* Imports
/* ---------------------------*/

import {
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import fs from "node:fs";
import path from "node:path";

/* ---------------------------*/
/* AWS Configuration
/* ---------------------------*/

const {
	AWS_S3_BUCKET: BUCKET_NAME,
	AWS_REGION: REGION,
	AWS_ACCESS_KEY_ID: ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: SECRET_ACCESS_KEY,
} = process.env;

if (!BUCKET_NAME || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
	throw new Error(
		"Missing required AWS configuration in environment variables.",
	);
}

const LOCAL_FOLDER = path.resolve("./icons");
const S3_PREFIX = "blockicon/";

const s3 = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	},
});

/* ---------------------------*/
/* Functions
/* ---------------------------*/

const getExistingKeys = async (
	prefix?: string | undefined,
): Promise<(string | undefined)[]> => {
	try {
		const response = await s3.send(
			new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix }),
		);

		return response.Contents?.map(({ Key }) => Key) || [];
	} catch (err) {
		console.error("Error listing objects:", err);
		return [];
	}
};

const uploadSvg = async (filePath: string, key: string): Promise<void> => {
	try {
		const fileStream = fs.createReadStream(filePath);
		await s3.send(
			new PutObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key,
				Body: fileStream,
				ContentType: "image/svg+xml",
			}),
		);

		console.log(`✅ Uploaded: ${key}`);
	} catch (err) {
		console.error(`❌ Failed to upload ${key}:`, err);
	}
};

const syncFolders = async (subfolders: string[] = []): Promise<void> => {
	const existingKeys = await getExistingKeys(S3_PREFIX);

	for (const folder of subfolders) {
		const dirPath = path.join(LOCAL_FOLDER, folder);
		let files: string[];

		try {
			files = await fs.readdirSync(dirPath);
		} catch (err) {
			console.warn(`Skipping missing folder: ${dirPath}`);
			continue;
		}

		await Promise.all(
			files
				.filter((f) => f.endsWith(".svg"))
				.map(async (file) => {
					const key = `${S3_PREFIX}${folder}/${file}`;
					if (!existingKeys.includes(key)) {
						await uploadSvg(path.join(dirPath, file), key);
					} else {
						console.log(`Already exists: ${key}`);
					}
				}),
		);
	}
};

/* ---------------------------*/
/* Execute Sync
/* ---------------------------*/
(async () => {
	try {
		await syncFolders(["network", "token"]);
		console.log("Sync complete");
	} catch (err) {
		console.error("Sync failed:", err);
	}
})();
