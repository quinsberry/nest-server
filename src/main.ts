import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function start() {
    const PORT = process.env.PORT || 4000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Nest testing')
        .setDescription('built NestJS, Sequelize, PostgreSQL')
        .setBasePath('/v1')
        .setVersion('1.0.0')
        .setExternalDoc('For more information', 'https://swagger.io')
        .addBearerAuth({ type: 'apiKey' }, 'header')
        .addTag('ekolesnyk', 'developer')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
        console.log(`Server has started on port: ${PORT}`)
    })
}

start()
