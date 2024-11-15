import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Picture } from "./Picture";
import { Field, ObjectType } from "type-graphql";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10)
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  price: number;

  @Field(() => [Picture])
  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  createdAt: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @Field(() => Tag, { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  tags: Tag[];
}
