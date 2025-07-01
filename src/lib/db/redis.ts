import { createClient } from "redis";

let client: any = null;

export async function getRedisClient() {
    if (!client) {
        client = await connectRedis();
    }
    return client;
}

export async function connectRedis() {
    try {
        const {REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT} = process.env;

        const redisClient = createClient({
            username: REDIS_USERNAME || undefined,
            password: REDIS_PASSWORD || undefined,
            socket: {
                host: REDIS_HOST,
                port: parseInt(REDIS_PORT || '0'),
                reconnectStrategy: (retries) => {
                    if (retries > 10) {
                        console.error('Max reconnection attempts reached');
                        return new Error('Max reconnection attempts reached');
                    }
                    // Exponential backoff: 100ms, 200ms, 400ms, etc.
                    return Math.min(retries * 100, 3000);
                }
            }
        });

        // Error handling
        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        redisClient.on('connect', () => {
            console.log('Connected to Redis!');
        });

        redisClient.on('reconnecting', () => {
            console.log('Reconnecting to Redis...');
        });

        // Connect to Redis
        await redisClient.connect();

        // Test the connection
        await redisClient.ping();
        console.log('Redis connection test successful!');

        return redisClient;
    } catch (error) {
        console.error('Redis connection error:', error);
        throw error;
    }
}