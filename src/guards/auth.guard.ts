import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = ctx.switchToHttp().getRequest()

        try {
            const authHeader = req.headers.authorization
            const [bearer, token] = authHeader.split(' ')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' })
            }

            req.user = this.jwtService.verify(token)
            return true
        } catch (e) {
            throw new UnauthorizedException({ message: 'User is not authorized' })
        }
    }
}
