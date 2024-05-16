import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import sequelizeConnection from "./utils/database";
// import userRoutes from "./routes/user";
// import cron from "node-cron";
// import packageRoutes from "./routes/package";
// import { updatePackagesStatus } from "./services/backgroundServices";



const app: Express = express();
dotenv.config();

const PORT = process.env.PORT || 20000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome");
});

// app.use("/api/user", userRoutes);
// app.use("/api/package", packageRoutes);

//error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("error", error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({status: false, message: message });
  });

 //background services
// cron.schedule("* * * * *", () => {
//   console.log("m here");
//   updatePackagesStatus().catch((error) => console.error("Error:", error));
// });

app.listen(PORT);
console.log(`listening on ${PORT}`);



//sync database
sequelizeConnection
  .sync()
  .then(result => {
    console.log(`listening2 on ${PORT}`);
    console.log("Database connected");
  
  })
  .catch(error => {
    console.error('Database synchronization failed:', error);
  });
