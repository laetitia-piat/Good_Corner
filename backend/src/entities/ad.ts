import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Picture } from "./picture";
import { Field, ObjectType } from "type-graphql";
import { Tag } from "./tag";
import { User } from "./user";

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
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  tags: Tag[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ads, { eager: true })
  user: User;
}
