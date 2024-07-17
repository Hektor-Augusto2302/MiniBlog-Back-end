import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        AuthModule,
    ],
})
export class AppModule implements OnModuleInit {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    onModuleInit() {
        this.connection.once('open', () => {
            console.log('Conexão bem sucedida com MongoDB');
        });
    }
}