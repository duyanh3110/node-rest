const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
    },
    db: {
        host: process.env.DEV_APP_PORT || "localhost",
        port: process.env.DEV_APP_PORT || 27017,
        name: process.env.DEV_APP_PORT || "shopDEV",
    },
};

const prod = {
    app: {
        port: process.env.PROD_APP_PORT || 3000,
    },
    db: {
        host: process.env.PROD_APP_PORT || "localhost",
        port: process.env.PROD_APP_PORT || 27017,
        name: process.env.PROD_APP_PORT || "shopPRO",
    },
};
type Env = "dev" | "prod";

const configObj = { dev, prod };
const env = (process.env.NODE_ENV || "dev") as Env;
const appConfig = configObj[env];

export default appConfig;
