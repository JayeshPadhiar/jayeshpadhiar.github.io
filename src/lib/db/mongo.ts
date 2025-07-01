import { MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient | null = null;

export async function getMongoClient() {
    if (!client) {
        client = await connectMongo();
    }
    return client;
}

export async function connectMongo() {
    try {
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;

        if (!username || !password) {
            throw new Error('MongoDB credentials not found in environment variables');
        }

        const uri = `mongodb+srv://${username}:${password}@cluster0.jun37sy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const mongoClient = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        // Connect and test the connection
        await mongoClient.connect();
        //await mongoClient.db("jayeshpadhiarcom").command({ ping: 1 });
        console.log("Successfully connected to MongoDB");

        return mongoClient;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}


