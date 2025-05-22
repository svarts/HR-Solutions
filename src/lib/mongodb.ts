import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
    throw new Error(
        "Please define the DATABASE_URL environment variable in .env.local"
    );
}

const uri: string = process.env.DATABASE_URL;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
