import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/router-not-found";
import catchAll from "./3-middleware/catch-all";
import authRoutes from "./6-routes/auth-routes"
import followRoutes from "./6-routes/follower-routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", dataRoutes, followRoutes);
server.use("/api/auth", authRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(3000, () => console.log("Server up"));