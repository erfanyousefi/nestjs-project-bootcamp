import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import SwaggerConfigInit from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);
  await app.listen(4000, () => {
    console.log("server run on port 4000");
  });
}
bootstrap();
