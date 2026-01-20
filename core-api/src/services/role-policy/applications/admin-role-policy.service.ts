import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { RolePolicyRepository } from '../repository/role-policy.repository';
import { Transactional } from '@libs/decorators';
import { RolePolicy } from '../domain/role-policy.entity';
import { PaginationOptions } from '@libs/utils';
import { Admin } from '@services/admins/domain/admin.entity';

@Injectable()
export class AdminRolePolicyService extends DddService {
  constructor(private readonly rolePolicyRepository: RolePolicyRepository) {
    super();
  }

  @Transactional()
  async create({ name, description }: { name: string; description: string }) {
    const [existedRolePolicy] = await this.rolePolicyRepository.find({ name });

    if (existedRolePolicy) {
      throw new BadRequestException(`${name} 이름의 권한 정책이 이미 존재합니다.`, {
        cause: `${name} 이름의 권한 정책이 이미 존재합니다.`,
      });
    }

    const rolePolicy = new RolePolicy({ name, description });
    await this.rolePolicyRepository.save([rolePolicy]);
  }

  async list({ search, searchValue }: { search: string; searchValue?: string }, options?: PaginationOptions) {
    const [rolePolicies, total] = await Promise.all([
      this.rolePolicyRepository.find({ search, searchValue }, { options }),
      this.rolePolicyRepository.count({ search, searchValue }),
    ]);

    return { items: rolePolicies, total };
  }

  @Transactional()
  async update({ id, name, description, admin }: { id: number; name?: string; description?: string; admin?: Admin }) {
    const [rolePolicy] = await this.rolePolicyRepository.find({ id });

    if (!rolePolicy) {
      throw new BadRequestException('해당 권한 정책을 찾을 수 없습니다.', {
        cause: '해당 권한 정책을 찾을 수 없습니다.',
      });
    }

    if (name) {
      const [duplicatedRolePolicy] = await this.rolePolicyRepository.find({ name });

      if (duplicatedRolePolicy) {
        throw new BadRequestException(`${name} 이름의 권한 정책이 이미 존재합니다.`, {
          cause: `${name} 이름의 권한 정책이 이미 존재합니다.`,
        });
      }
    }

    rolePolicy.update({ name, description }, admin);
    await this.rolePolicyRepository.save([rolePolicy]);
  }

  @Transactional()
  async remove({ id }: { id: number }) {
    const [rolePolicy] = await this.rolePolicyRepository.find({ id });

    if (!rolePolicy) {
      throw new BadRequestException('해당 권한 정책을 찾을 수 없습니다.', {
        cause: '해당 권한 정책을 찾을 수 없습니다.',
      });
    }

    await this.rolePolicyRepository.softRemove([rolePolicy]);
  }
}
