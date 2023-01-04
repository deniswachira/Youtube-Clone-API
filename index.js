const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const videoRoutes = require('./routes/videos');

//middlewares
app.use(express.json());
dotenv.config();
// app.use(cookieParser());

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to mongodb"))
    .catch((err) => console.log(err));


app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port 5000');
});