import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT, LIMIT, TOKENTIME, SECRET } from "./config";

import routes from "./routes";

const app = express();

app
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(
    bodyParser.json({
      limit: LIMIT
    })
  );

app.use("/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});