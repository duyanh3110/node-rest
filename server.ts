import app from "./src/app";

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`WSV started on ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`Exit Server Express`));
});