const express = require('express');
const app = express();
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;


//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    
    res.send("API running");
})



//API Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))


// const PORT = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on ${port}`)) 