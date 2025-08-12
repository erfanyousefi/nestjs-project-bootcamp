import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export default function SwaggerConfigInit(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Bootcamp Weblog system")
    .setDescription("backend api for bootcamp-blog using nestjs")
    .setVersion("v0.0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "Authorization"
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, swaggerDocument);
}
