import { Token } from '@services/tokens/domain/token.entity';
import { User } from '@services/users/domain/user.entity';
import { DddEvent } from '@libs/ddd';
import { Admin } from '@services/admins/domain/admin.entity';
import { Role } from '@services/roles/domain/role.entity';
import { RolePolicy } from '@services/role-policy/domain/role-policy.entity';
import { History } from '@services/history/domain/history.entity';
import { Artist } from '@services/artists/domain/artist.entity';
import { Tag } from '@services/tags/domain/tag.entity';

export default [Token, User, DddEvent, Admin, Role, RolePolicy, History, Artist, Tag];
