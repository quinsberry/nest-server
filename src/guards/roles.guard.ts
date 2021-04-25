import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = ctx.switchToHttp().getRequest()

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                ctx.getHandler(),
                ctx.getClass(),
            ])
            const requiredRolesSet = new Set(requiredRoles)

            if (!requiredRoles) {
                return true
            }

            const authHeader = req.headers.authorization
            const [bearer, token] = authHeader.split(' ')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' })
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some((role) => requiredRolesSet.has(role.value))
        } catch (e) {
            throw new HttpException('User has not access', HttpStatus.FORBIDDEN)
        }
    }
}
