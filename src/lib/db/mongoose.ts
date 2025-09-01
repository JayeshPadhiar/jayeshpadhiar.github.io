import mongoose from "mongoose";

interface MongooseCache {
	connection: mongoose.Connection | null;
	promise: Promise<typeof mongoose> | null;
}

const mongooseCache: MongooseCache = {
	connection: null,
	promise: null,
}
declare global {
	var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
	cached = global.mongooseCache = {
		connection: null,
		promise: null,
	}
}

const connectMongoose = async () => {

	if (mongooseCache!.connection) return mongooseCache!.connection;

	if (!cached!.promise) {
		const username = process.env.MONGO_USERNAME;
		const password = process.env.MONGO_PASSWORD;

		if (!username || !password) {
			throw new Error('MongoDB credentials not found in environment variables');
		}

		const uri = `mongodb+srv://${username}:${password}@cluster0.jun37sy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

		cached!.promise = mongoose.connect(uri, {
			bufferCommands: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			family: 4, // Use IPv4, skip trying IPv6
		});
	}

	try {
		cached!.connection = await cached!.promise as any;
	} catch (e) {
		cached!.promise = null;
		throw e;
	}

	return cached!.connection;
}

export default connectMongoose;