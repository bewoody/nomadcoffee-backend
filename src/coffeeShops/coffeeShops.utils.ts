import { createWriteStream } from "fs";

export const extractCategories = (category: [string]) =>
  category.map((cate: string) => {
    const lowerStr = cate.toLowerCase().trim();
    return {
      where: {
        name: lowerStr,
      },
      create: {
        name: lowerStr,
        slug: lowerStr.replace(/\s+/g, "-"),
      },
    };
  });

export const extractPhotos = async (photo: any) => {
  const { filename, createReadStream } = await photo;
  const newFilename = `${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  const photoUrl = `http://localhost:4000/static/${newFilename}`;
  return {
    url: photoUrl,
  };
};
