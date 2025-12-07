import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminService extends DddService {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async list({ search, searchValue }: { search?: string; searchValue?: string }, options?: PaginationOptions) {
    const [admins, total] = await Promise.all([
      this.adminRepository.find({ search, searchValue }, options),
      this.adminRepository.count({ search, searchValue }),
    ]);

    return { items: admins, total };
  }
}
