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
const { error } = require('console');

app.use(express.json());
app.use(cors());               
app.use(express.urlencoded({extended: true}));

// app.use('/role', roleRouter);
// app.use('/userlog', userLogRouter);
// app.use('/user', userRouter);
// app.use('/bankAccount', bankAccountRouter);
// app.use('/transaction', transactionRouter);

app.use('/api/role', roleRouter);
app.use('/api/userlog', userLogRouter);
app.use('/api/user', userRouter);
app.use('/api/bankAccount', bankAccountRouter);
app.use('/api/transaction', transactionRouter);

app.use(express.static(path.join(__dirname,'/client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.use(errorHandler);
