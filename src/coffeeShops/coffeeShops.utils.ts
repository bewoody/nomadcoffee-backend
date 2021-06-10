import { createWriteStream } from "fs";

export const extractCategories = (category: string) => {
  const hashcategories = category.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w\s]+/g) || [];
  return hashcategories.map((cate: string) => {
    const lowerStr = cate.toLowerCase().trim().replace("#", "");
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
};

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
