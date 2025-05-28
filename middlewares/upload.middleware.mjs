import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}.${fileType}`;
    cb(null, fileName);
  },
});

// const fileFilter = (req, file, cb) => {
//   const imgType = file.mimetype.split("/")[0];
//   if (imgType !== "image") {
//     const error = {
//       message: "Invalid file type. Only images are allowed.",
//       status: 400,
//     }
//     return cb(error, false);
//   } else if (imgType === "image") {
//     cb(null, true);
//   }
// };
const upload = multer({ storage });

export default upload;
