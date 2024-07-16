import mongoose from "mongoose";

const connectString = `mongodb://localhost:27017/shopDEV`;

class Database {
    static instance: any;

    constructor() {
        this.connect("mongodb");
    }

    connect(type: string) {
        if (type === "mongodb") {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(connectString, {
                maxPoolSize: 50,
            })
            .then((_) => console.log(`Connected Mongodb Successfully`))
            .catch((err) =>
                console.log(`Error Connecting to Mongo ::: ${err}`)
            );
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

export default instanceMongoDb;
