import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { TagRepository } from '../repository/tag.repository';
import { Transactional } from '@libs/decorators';
import { PaginationOptions } from '@libs/utils';
import { Tag } from '../domain/tag.entity';

@Injectable()
export class AdminTagService extends DddService {
  constructor(private readonly tagRepository: TagRepository) {
    super();
  }

  async list({ search, searchValue }: { search?: string; searchValue?: string }, options?: PaginationOptions) {
    const [tags, total] = await Promise.all([
      this.tagRepository.find({ search, searchValue }, { options }),
      this.tagRepository.count({ search, searchValue }),
    ]);

    return { items: tags, total };
  }

  @Transactional()
  async create({ category, name }: { category: string; name: string }) {
    const [duplicatedTag] = await this.tagRepository.find({ category, name });

    if (duplicatedTag) {
      throw new BadRequestException('이미 존재하는 태그입니다.', { cause: '이미 존재하는 태그입니다.' });
    }

    const tag = new Tag({ category, name });
    await this.tagRepository.save([tag]);
  }

  @Transactional()
  async update({ id, category, name }: { id: number; category?: string; name?: string }) {
    const [tag] = await this.tagRepository.find({ ids: [id] });

    if (!tag) {
      throw new BadRequestException('존재하지 않는 태그입니다.', { cause: '존재하지 않는 태그입니다.' });
    }

    tag.update({ category, name });

    const [duplicatedTag] = await this.tagRepository.find({ category, name });

    if (duplicatedTag) {
      throw new BadRequestException('이미 존재하는 태그입니다.', { cause: '이미 존재하는 태그입니다.' });
    }

    await this.tagRepository.save([tag]);
  }

  @Transactional()
  async remove({ id }: { id: number }) {
    const [tag] = await this.tagRepository.find({ ids: [id] });

    if (!tag) {
      throw new BadRequestException('존재하지 않는 태그입니다.', { cause: '존재하지 않는 태그입니다.' });
    }

    await this.tagRepository.softRemove([tag]);
  }
}
