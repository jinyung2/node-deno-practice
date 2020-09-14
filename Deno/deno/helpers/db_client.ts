// db_client the naming convention standard from deno style guide

import { MongoClient, Database } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

let db: Database;

export function connect() {
    const client = new MongoClient();
    const MONGODB_URI =
        "mongodb+srv://jin:fkCB135UHCcAz4El@cluster0-ektra.azure.mongodb.net/?retryWrites=true&w=majority";    
    client.connectWithUri(MONGODB_URI);
    // client can now connect to specific database in mongodb
    db = client.database("todos");
}    

export function getDb() {
    return db;
}