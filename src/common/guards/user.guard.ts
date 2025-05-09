import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException(
        "Unauthorized user. Authorization header is missing"
      );

    const [bearer, token] = authHeader.split(" ");
    console.log("user.guard.ts 26 bearer:", bearer);
    console.log("user.guard.ts 27 token:", token);
    if (bearer !== "Bearer")
      throw new UnauthorizedException("Invalid authorization header format");
    return true;
  }
}
