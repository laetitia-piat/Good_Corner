import { UserInput } from "../input/UserInput";
import { User } from "../entities/user";
import * as argon2 from "argon2";
import { Resend } from "resend";
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
import { TempUser } from "../entities/tempUser";
import { v4 as uuidv4 } from "uuid";

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
    const randomCode = uuidv4();
    const result = await TempUser.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
      randomCode: randomCode,
    });
    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [newUserData.email],
        subject: "Verify Email",
        html: `
          <p>Please click the link below to confirm your email address</p>
          <a href="http://localhost:7000/confirm/${randomCode}">
            http://localhost:7000/confirm/${randomCode}
          </a>
          `,
      });
      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();
    console.log(result);
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

  @Mutation(() => String)
  async confirmEmail(@Arg("codeByUser") codeByUser: string) {
    const tempUser = await TempUser.findOneByOrFail({ randomCode: codeByUser });
    await User.save({
      email: tempUser.email,
      hashedPassword: tempUser.hashedPassword,
    });
    tempUser.remove();
    return "ok";
  }
}

export default UserResolver;
