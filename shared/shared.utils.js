import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadPhoto = async (file, storeId) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const fileName = `${storeId}-${Date.now()}-${filename}`;
  const { Location: url } = await new AWS.S3()
    .upload({
      Bucket: "standbytogether",
      Key: fileName,
      ACL: "public-read-write",
      Body: readStream,
    })
    .promise();
  return { url, name: fileName };
};

export const deletePhoto = async (deleteFileName) => {
  try {
    await new AWS.S3()
      .deleteObject({
        Bucket: "standbytogether",
        Key: deleteFileName,
      })
      .promise();
  } catch (err) {
    throw new Error("AWS Photo 삭제 도중 에러 발생");
  }
};
