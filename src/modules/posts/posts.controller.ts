import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service'
import { Post as PostModel } from '../posts/posts.model'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: PostModel })
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
