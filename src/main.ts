import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import SwaggerConfigInit from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);

  // CORS middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://example.com"); // Change to your allowed origin
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  await app.listen(4000, () => {
    console.log("server run on port 4000");
  });
}
bootstrap();
