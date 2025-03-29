/* ---------------------------*/
/* Imports
/* ---------------------------*/

import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

/* ---------------------------*/
/* Load Environment Variables
/* ---------------------------*/

dotenv.config();

/* ---------------------------*/
/* AWS Configuration
/* ---------------------------*/

const BUCKET_NAME = process.env.AWS_S3_BUCKET as string;
const REGION = process.env.AWS_REGION as string;
const LOCAL_FOLDER = "./icons";
const S3_PREFIX = "blockicon";

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

/* ---------------------------*/
/* Functions
/* ---------------------------*/

// Função para obter a lista de arquivos já no S3
const getExistingFiles = async (): Promise<string[]> => {
  try {
    const response = await s3.send(
      new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: S3_PREFIX }),
    );
    return response.Contents?.map((file) => file.Key!) || [];
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    return [];
  }
};

const uploadFile = async (filePath: string, s3Key: string): Promise<void> => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileStream,
      ACL: ObjectCannedACL.public_read,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`✅ Sent: ${s3Key}`);
  } catch (error) {
    console.error(`❌ Error sending ${s3Key}:`, error);
  }
};

const syncFolder = async (): Promise<void> => {
  const existingFiles = await getExistingFiles();
  const folders = ["networks", "tokens"];

  for (const folder of folders) {
    const folderPath = path.join(LOCAL_FOLDER, folder);
    const filesToUpload = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".svg"));

    for (const file of filesToUpload) {
      const filePath = path.join(folderPath, file);
      const s3Key = `${S3_PREFIX}/${folder}/${file}`;

      if (!existingFiles.includes(s3Key)) {
        await uploadFile(filePath, s3Key);
      } else {
        console.log(`🔄 Already exists in S3: ${s3Key}`);
      }
    }
  }
};

/* ---------------------------*/
/* Execute Sync
/* ---------------------------*/

syncFolder();
