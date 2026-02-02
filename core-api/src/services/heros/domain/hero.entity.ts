import { DddAggregate } from '@libs/ddd';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HeroItem, HeroItemCtor } from './hero-item.entity';

export enum HeroType {
  HOME = 'home',
  ARTIST = 'artist',
  MUSIC = 'music',
}

type HeroCtor = {
  type: HeroType;
  heroItems: HeroItemCtor[];
};

@Entity()
export class Hero extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: HeroType })
  type: HeroType;

  @OneToMany(() => HeroItem, (heroItem) => heroItem.hero, { cascade: true })
  heroItems: HeroItem[];

  private constructor(args: { type: HeroType; heroItems: HeroItem[] }) {
    super();

    if (args) {
      this.type = args.type;
      this.heroItems = args.heroItems;
    }
  }

  static of(args: HeroCtor) {
    if (args.type === HeroType.HOME) {
      // const heroItems = args.heroItems.map((heroItem) => HeroItem.of(heroItem));
    }
  }
}
