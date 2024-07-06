import { connectToDB } from "@mongodb/database";
import User from "@models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import crypto from "crypto";


/* USER REGISTER */
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData();
    const reset_password_token = data.get('slug');
    const password = data.get('password');
    console.log(password);
    console.log("abhay");

    // Find the user by reset_password_token
    const hash_pass= crypto.createHash('sha256').update(reset_password_token).digest("hex");
    console.log(hash_pass);
    const existingUser = await User.findOne({ password_reset_token :hash_pass});
    console.log(existingUser.email)
    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist!" }, { status: 409 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    // const hashedPassword = password;


    // Update the user's password

    existingUser.password = hashedPassword;
    await existingUser.save();

    return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });

  } catch (err) {
    console.error("Failed to update password:", err);
    return NextResponse.json({ message: "Failed to update password!" }, { status: 500 });
  }
}
