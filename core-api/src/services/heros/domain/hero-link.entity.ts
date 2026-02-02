import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Hero } from './hero.entity';

export enum HeroLinkType {
  EXTERNAL = 'external',
  INTERNAL = 'internal',
}

export type HeroLinkCtor = {
  title?: string;
  type: HeroLinkType;
};

@Entity()
export class HeroLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: 'enum', enum: HeroLinkType })
  type: HeroLinkType;

  @OneToOne(() => Hero, (hero) => hero.heroLink, { onDelete: 'CASCADE' })
  @JoinColumn()
  hero: Hero;

  constructor(args: HeroLinkCtor) {
    if (args) {
      this.title = args.title;
      this.type = args.type;
    }
  }
}
