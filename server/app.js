import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// const allowedOrigins = [
//     "https://blendr-taupe.vercel.app",
//     "https://sociopedia-pi.vercel.app"
// ];
  
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     allowedHeaders: [
//         "Content-Type",
//         "Authorization",
//         "X-Requested-With",
//         "Accept",
//         "Access-Control-Allow-Origin",
//     ],
//     credentials: true,
//     maxAge: 86400, // 1 day (in seconds)
// };
// const corsOptions = {
//     origin: "https://blendr.onrender.com",
// }
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/* FILE STORAGE */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* ROUTES WITH FILES */

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server port: ${PORT}`);
    });
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => {
    console.log(`${error} did not connect`);
});
