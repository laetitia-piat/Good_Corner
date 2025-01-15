import { UserInput } from "../input/UserInput";
import { User } from "../entities/user";
import * as argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

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
  @Query(() => String)
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
        { email: user.email },
        process.env.JWT_SECRET_KEY as Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

      return "ok";
    } else {
      throw new Error("Incorrect login!");
    }
  }
}

export default UserResolver;
