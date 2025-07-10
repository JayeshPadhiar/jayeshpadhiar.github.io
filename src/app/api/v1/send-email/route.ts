import { NextResponse } from "next/server";

const nodemailer = require('nodemailer');

const sendEmail = async (email: string, subject: string, message: string): Promise<any> => {

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: true,
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: email,
		to: 'jayeshpadhiar20@gmail.com',
		subject: subject,
		html: `
			<p>${message}</p>
			<p>From: <a href="mailto:${email}">${email}</a></p>
		`
	}

	return await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
	const { email, subject, message } = await request.json();

	try {
		const resp = await sendEmail(email, subject, message);
		return NextResponse
			.json({ message: "Email sent successfully", code: "EMAIL_SENT_SUCCESSFULLY", response: resp }, { status: 200 });
	} catch (error) {
		return NextResponse
			.json({ message: "Email sending failed", code: "EMAIL_SENDING_FAILED", error: error }, { status: 500 });
	}
}