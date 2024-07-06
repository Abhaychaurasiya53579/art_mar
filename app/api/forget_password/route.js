import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { connectToDB } from "@mongodb/database";
import User from "@models/User";

// Handling POST requests
export async function POST(request) {
  try {
    const data = await request.formData()
    const email = data.get('email')

    await connectToDB();

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return NextResponse.json({ message: "User does not  exists!" }, { status: 404 })
    }




    const reset_token = existingUser.create_reset_password_token();
    await  existingUser.save();

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhaychaurasiya53579@gmail.com',
        pass: 'ktod vfcr sexx ernh' 
    }
    });

    const mailOptions = {
      from: 'abhaychaurasiya53579@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://localhost:3000/reset-password/${reset_token}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Reset email sent', reset_token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
  }
}
