import { UserInput } from "../input/UserInput";
import { User } from "../entities/user";
import * as argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: String;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const result = await User.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
    });
    console.log("result", result);
    return "ok";
  }
  @Mutation(() => String)
  async login(@Arg("data") loginUserData: UserInput, @Ctx() context: any) {
    let isPasswordOk = false;
    const user = await User.findOneBy({ email: loginUserData.email });
    if (user) {
      isPasswordOk = await argon2.verify(
        user.hashedPassword,
        loginUserData.password
      );
    }
    if (isPasswordOk === true && user !== null) {
      const token = jwt.sign(
        { email: user.email, userRole: user.role },
        process.env.JWT_SECRET_KEY as Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

      return "ok";
    } else {
      throw new Error("Incorrect login!");
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=${""}; Secure; HttpOnly; Max-Age=0`
    );
    return "You're log out";
  }

  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: any) {
    if (context.email) {
      return { isLoggedIn: true, email: context.email };
    } else {
      return {
        isLoggedIn: false,
      };
    }
  }
}

export default UserResolver;
