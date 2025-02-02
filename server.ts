import app from "./src/app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`WSV started on ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`Exit Server Express`));
    process.exit(0);
});
