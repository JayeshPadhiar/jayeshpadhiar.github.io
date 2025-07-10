const jwt = require('jsonwebtoken');
import { getMongoClient } from "@/lib/db/mongo";
import { NextRequest, NextResponse } from "next/server";
import { compare, genSalt, hash } from "bcryptjs";
import { getRedisClient } from "@/lib/db/redis";
import { cookies } from "next/headers";

const signUp = async (req: NextRequest) => {
	try {
		const mongoClient = await getMongoClient()
		const { username, password, signupKey } = await req.json();
		if (signupKey !== process.env.SIGNUP_KEY) {
			return NextResponse.json({ message: "Invalid signup key", code: 'SIGNUP_ERROR', error: "Invalid signup key" }, { status: 400 });
		}
		const user = await mongoClient.db("jayeshpadhiarcom").collection("users").findOne({ username });
		if (user) {
			return NextResponse.json({ message: "User already exists", code: 'SIGNUP_ERROR', error: "User already exists" }, { status: 400 });
		}

		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);
		const newUser = await mongoClient.db("jayeshpadhiarcom").collection("users").insertOne({
			username,
			password: hashedPassword
		});

		return NextResponse.json({ message: "User created successfully", code: 'SIGNUP_SUCCESS', user: newUser }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Error creating user", code: 'SIGNUP_ERROR', error: error }, { status: 500 });
	}
}

const login = async (req: NextRequest) => {
	try {
		const mongoClient = await getMongoClient()
		const { username, password } = await req.json();
		const user = await mongoClient.db("jayeshpadhiarcom").collection("users").findOne({ username });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			return NextResponse.json({ message: "Invalid password" }, { status: 401 });
		}

		const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET);
		const redisClient = await getRedisClient();
		await redisClient.set(token, user._id.toString());
		return NextResponse.json({ message: "Login successful", code: 'LOGIN_SUCCESS', user: user, token: token }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error logging in", code: 'LOGIN_ERROR', error: error }, { status: 500 });
	}
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string }> }) {
	const { path } = await params;
	switch (path) {
		case "login":
			return login(req);
		case "signup":
			return signUp(req);
		default:
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}
}