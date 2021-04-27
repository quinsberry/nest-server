import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'
import { addRoleDto } from './dto/add-role.dto'
import { banUserDto } from './dto/ban-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue('user')

        await user.$set('roles', [role.id])
        user.roles = [role]

        return user
    }

    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email }, include: { all: true } })
    }

    async addRole(dto: addRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.rolesService.getRoleByValue(dto.value)

        if (!user && !role) {
            throw new HttpException('User or role were not found', HttpStatus.NOT_FOUND)
        }

        await user.$add('role', role.id)
        return dto
    }

    async ban(dto: banUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        user.banned = true
        user.banReason = dto.banReason
        await user.save()

        return user
    }
}
