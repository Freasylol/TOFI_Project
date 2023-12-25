const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHadlingMiddleware');

const app = express();

const PORT =  process.env.PORT || 3001; 

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync().then(req => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))); 
    } catch (e) {
        console.log(e)
    }
}

start();

const roleRouter = require('./routes/roleRouter');
const userLogRouter = require('./routes/userLogRouter');
const userRouter = require('./routes/userRouter');
const transactionRouter = require('./routes/transactionRouter');
const bankAccountRouter = require('./routes/bankAccountRouter');
const creditRouter = require('./routes/creditRouter');
const depositRouter = require('./routes/depositRouter');
const { error } = require('console');

app.use(express.json());
app.use(cors());               
app.use(express.urlencoded({extended: true}));

app.use('/api/role', roleRouter);
app.use('/api/userLog', userLogRouter);
app.use('/api/user', userRouter);
app.use('/api/bankAccount', bankAccountRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/credit', creditRouter);
app.use('/api/deposit', depositRouter);

app.use(express.static(path.join(__dirname,'/client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.use(errorHandler);
