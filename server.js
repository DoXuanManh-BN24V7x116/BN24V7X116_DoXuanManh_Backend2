const app = require("./app");
const config = require("./app/config");
const { connectToDatabase } = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(config.app.port, () => {
      console.log(`🚀 Server is running at http://localhost:${config.app.port}`);
    });
  } catch (err) {
    console.error("❌ Cannot connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();
