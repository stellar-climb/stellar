import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Hero } from './hero.entity';

export type HeroEventCtor = {
  title?: string;
  eventId: number;
};

@Entity()
export class HeroEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column()
  eventId!: number;

  @OneToOne(() => Hero, (hero) => hero.heroEvent, { onDelete: 'CASCADE' })
  @JoinColumn()
  hero: Hero;

  constructor(args: HeroEventCtor) {
    if (args) {
      this.title = args.title;
      this.eventId = args.eventId;
    }
  }
}
