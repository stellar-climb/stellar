import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hero } from './hero.entity';

export type HeroSeriesCtor = {
  seriesId: number;
  title: string;
  characterImageUrl: string;
  subText: string;
  colorText: string;
  bottomText: string;
};

@Entity()
export class HeroSeries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column()
  characterImageUrl!: string;

  @Column()
  subText: string;

  @Column()
  colorText: string;

  @Column()
  bottomText: string;

  @Column()
  seriesId!: number;

  @OneToOne(() => Hero, (hero) => hero.heroSeries, { onDelete: 'CASCADE' })
  @JoinColumn()
  hero: Hero;

  constructor(args: HeroSeriesCtor) {
    if (args) {
      this.seriesId = args.seriesId;
      this.title = args.title;
      this.characterImageUrl = args.characterImageUrl;
      this.subText = args.subText;
      this.colorText = args.colorText;
      this.bottomText = args.bottomText;
    }
  }
}
