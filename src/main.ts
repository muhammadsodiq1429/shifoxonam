import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("api");
  app.use(cookieParser())
  // app.useGlobalFilters(new Sequelize)

  const config = new DocumentBuilder()
    .setTitle("Shifoxonam API")
    .setDescription(
      "Bu API shifoxona boshqaruvi uchun yaratilgan. Unda foydalanuvchilar, shifokorlar, bemorlar, bo'limlar, uchrashuvlar va boshqa ma'lumotlarga oid endpointlar mavjud."
    )
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "JWT tokenni kiriting",
        in: "header",
      },
      "JWT-auth"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT);
  console.log(`Server started at: http://localhost:${PORT}`);
}
start();
