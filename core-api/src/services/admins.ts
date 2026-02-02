import { AdminUserModule } from './users/admin-user.module';
import { AdminModule } from './admins/admins.module';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminRoleModule } from './roles/admin-role.module';
import { AdminRolePolicyModule } from './role-policy/admin-role-policy.module';
import { AdminHistoryModule } from './history/admin-history.module';
import { AdminArtistModule } from './artists/admin-artist.module';
import { AdminTagModule } from './tags/admin-tag.module';
import { AdminAlbumModule } from './albums/admin-album.module';
import { AdminFileModule } from './files/admin-file.module';
import { AdminMusicModule } from './music/admin-music.module';
import { AdminFaqModule } from './faqs/admin-faq.module';
import { AdminHeroModule } from './heros/admin-hero.module';

export default [
  AdminUserModule,
  AdminModule,
  AdminAuthModule,
  AdminRoleModule,
  AdminRolePolicyModule,
  AdminHistoryModule,
  AdminArtistModule,
  AdminTagModule,
  AdminAlbumModule,
  AdminFileModule,
  AdminMusicModule,
  AdminFaqModule,
  AdminHeroModule,
];
