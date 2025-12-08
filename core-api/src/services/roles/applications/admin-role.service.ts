import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class AdminRoleService extends DddService {
  constructor(private readonly roleRepository: RoleRepository) {
    super();
  }
}
