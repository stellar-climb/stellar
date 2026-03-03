import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

export enum HeroType {
  HOME = 'home',
  ALBUM = 'album',
  SERIES = 'series',
}

type Ctor = {
  type: HeroType;
};

@Entity()
export class Hero extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: HeroType;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.type = args.type;
    }
  }
}
