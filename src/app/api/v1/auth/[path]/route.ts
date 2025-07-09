//import jwt from "jsonwebtoken";
import { getMongoClient } from "@/lib/db/mongo";
import { NextRequest, NextResponse } from "next/server";
import { compare, genSalt, hash } from "bcryptjs";

const signUp = async (req: NextRequest) => {
	const mongoClient = await getMongoClient()
	const { username, password } = await req.json();
	const user = await mongoClient.db("jayeshpadhiarcom").collection("users").findOne({ username });
	if (user) {
		return NextResponse.json({ message: "User already exists" }, { status: 400 });
	}

	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	const newUser = await mongoClient.db("jayeshpadhiarcom").collection("users").insertOne({ 
		username, 
		password: hashedPassword 
	});

	return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
}

const login = async (req: NextRequest) => {
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

	return NextResponse.json({ message: "Login successful", user: user }, { status: 200 });
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