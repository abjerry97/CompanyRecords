import { PassportStrategy } from '@nestjs/passport';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { FirebaseService } from '../services/firebase.service';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private readonly firebase: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  @Inject(UserService)
  private readonly userService: UserService;

  async validate(token: string) {
    const firebaseUser = await this.firebase.instance
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException('User not found');
    }

    let user: any = await this.userService.findOneByUid(firebaseUser.uid);

    if (!user) user = await this.userService.create(firebaseUser);

    return user;
  }
}
