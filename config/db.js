const mongoose = require("mongoose")

console.log("BACKEND MONGODB",process.env.MONGODB_URL)
async function connectDB() {
    try {
        await mongoose
            .connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB