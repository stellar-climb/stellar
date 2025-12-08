import { Token } from '@services/tokens/domain/token.entity';
import { User } from '@services/users/domain/user.entity';
import { DddEvent } from '@libs/ddd';
import { Admin } from '@services/admins/domain/admin.entity';
import { Role } from '@services/roles/domain/role.entity';

export default [Token, User, DddEvent, Admin, Role];
