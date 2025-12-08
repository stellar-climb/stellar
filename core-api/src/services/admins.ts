import { AdminUserModule } from './users/admin-user.module';
import { AdminModule } from './admins/admins.module';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminRoleModule } from './roles/admin-role.module';

export default [AdminUserModule, AdminModule, AdminAuthModule, AdminRoleModule];
