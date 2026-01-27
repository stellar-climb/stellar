import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Music } from '@services/music/domain/music.entity';

type Ctor = {
  category: string;
  name: string;
};

@Entity()
export class Tag extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @ManyToMany(() => Music, (music) => music.tags)
  musics: Music[];

  constructor(args: Ctor) {
    super();
    if (args) {
      this.category = args.category;
      this.name = args.name;
    }
  }

  update(args: { category?: string; name?: string }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    Object.assign(this, changedArgs);
  }
}
