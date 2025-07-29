import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import BlogModule from "./blog/blog.module";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
