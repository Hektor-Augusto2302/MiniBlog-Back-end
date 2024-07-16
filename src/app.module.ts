import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.once('open', () => {
      console.log('Successfully connected to MongoDB');
    });
  }
}
