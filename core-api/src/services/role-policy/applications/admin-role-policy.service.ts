import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { RolePolicyRepository } from '../repository/role-policy.repository';
import { Transactional } from '@libs/decorators';
import { RolePolicy } from '../domain/role-policy.entity';
import { PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminRolePolicyService extends DddService {
  constructor(private readonly rolePolicyRepository: RolePolicyRepository) {
    super();
  }

  @Transactional()
  async create({ name, description }: { name: string; description: string }) {
    const [existedRolePolicy] = await this.rolePolicyRepository.find({ name });

    if (existedRolePolicy) {
      throw new BadRequestException('이미 존재하는 역할 정책입니다.', { cause: '이미 존재하는 역할 정책입니다.' });
    }

    const rolePolicy = new RolePolicy({ name, description });
    await this.rolePolicyRepository.save([rolePolicy]);
  }

  async list({ search, searchValue }: { search: string; searchValue?: string }, options?: PaginationOptions) {
    const [rolePolicies, total] = await Promise.all([
      this.rolePolicyRepository.find({ search, searchValue }, options),
      this.rolePolicyRepository.count({ search, searchValue }),
    ]);

    return { items: rolePolicies, total };
  }
}
