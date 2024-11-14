import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";
import { Field } from "type-graphql";

@Entity()
export class Picture extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field(() => Picture)
  @ManyToOne(() => Ad, (ad) => ad.pictures)
  ad: Ad;
}
