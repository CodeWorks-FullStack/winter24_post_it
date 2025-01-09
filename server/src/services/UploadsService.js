import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import sharp from "sharp"

const awsRegion = process.env.AWS_REGION
const awsBucket = process.env.AWS_BUCKET

const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: process.env.AWS_IAM_KEY,
    secretAccessKey: process.env.AWS_IAM_SECRET
  }
})

class UploadsService {
  async uploadImage(imageFile, userId) {

    const sharpData = sharp(imageFile.data)
    sharpData.resize({ width: 500 })
    // const jpeg = await sharpData.jpeg({ quality: 60, chromaSubsampling: '4:4:4' }).toBuffer()
    const webp = await sharpData.webp({ quality: 40, nearLossless: true }).toBuffer()

    // Uploading image to AWS S3
    const uploadCommand = new PutObjectCommand({
      Bucket: awsBucket,
      Key: `${userId}/${imageFile.name}`,
      Body: webp,
      ContentType: 'image/webp',
      CacheControl: 'max-age=36000'
    })
    const s3Response = await s3Client.send(uploadCommand)
    if (s3Response.$metadata.httpStatusCode != 200) throw new Error("Image upload to s3 failed")
    const uploadUrl = `https://${awsBucket}.s3.${awsRegion}.amazonaws.com/${userId}/${imageFile.name}`
    return { url: uploadUrl }
  }
}

export const uploadsService = new UploadsService()
