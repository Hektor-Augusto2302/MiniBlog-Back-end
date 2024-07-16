import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://hektoraugustos:g4yADENKzmlcAAX8@cluster0.jh9gxms.mongodb.net/'),
    ],
})

export class DatabaseModule { }