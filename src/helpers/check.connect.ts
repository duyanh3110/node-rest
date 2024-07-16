import mongoose from "mongoose";
import os from "os";

const SECONDS = 5000;
const MAX_NUMBER = 5;

const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections ::: ${numConnection}`);
};

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * MAX_NUMBER;

        console.log(`Active connections ::: ${numConnection}`);
        console.log(`Memory usage ::: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log(`Connection overload detected!`);
        }
    }, SECONDS);
};

export { countConnect, checkOverload };
