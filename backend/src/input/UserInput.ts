import { User } from "../entities/user";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserInputReset implements Partial<User> {
  @Field()
  email: string;
}
