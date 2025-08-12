import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import AuthModule from "./modules/auth/auth.module";
import BlogModule from "./modules/blog/blog.module";
import UserModule from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "bootcamp-blog",
      username: "postgres",
      password: "root",
      host: "localhost",
      port: 5432,
      synchronize: true,
      autoLoadEntities: true,
      entities: [],
    }),
    BlogModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
