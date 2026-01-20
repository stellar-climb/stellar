import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminRepository } from '../repository/admin.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminResponseDto } from '../controllers/dto';

@Injectable()
export class AdminService extends DddService {
  constructor(private readonly adminRepository: AdminRepository) {
    super();
  }

  async list({ search, searchValue }: { search?: string; searchValue?: string }, options?: PaginationOptions) {
    const [admins, total] = await Promise.all([
      this.adminRepository.find({ search, searchValue }, { options }),
      this.adminRepository.count({ search, searchValue }),
    ]);

    return { items: admins.map((admin) => admin.toInstance(AdminResponseDto)), total };
  }
}
