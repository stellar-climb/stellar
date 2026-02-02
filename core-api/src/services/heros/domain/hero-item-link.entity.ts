import { DddAggregate } from '@libs/ddd';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HeroItem } from './hero-item.entity';

export type HeroItemLinkCtor = {
  title?: string;
  backgroundImageUrl?: string;
  linkUrl: string;
};

@Entity()
export class HeroItemLink extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heroItemId: number;

  @Column()
  title?: string;

  @Column()
  backgroundImageUrl?: string;

  @Column()
  linkUrl: string;

  @ManyToOne(() => HeroItem, (heroItem) => heroItem.heroItemLink, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'heroItemId' })
  heroItem: HeroItem;

  constructor(args: HeroItemLinkCtor) {
    super();

    if (args) {
      this.title = args.title;
      this.backgroundImageUrl = args.backgroundImageUrl;
      this.linkUrl = args.linkUrl;
    }
  }
}
