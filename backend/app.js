const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

mongoose.connect('mongodb+srv://botuz:ZROnca6qVvcf0m0g@cluster0.mf2jg.mongodb.net/blog-post', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(() => {
		console.log('Connection failed len!');
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS, PUT');
	next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);

module.exports = app;