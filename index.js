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

// const userRouter = require('./routes/userRouter');
// const deviceRouter = require('./routes/deviceRouter');
// const typeRouter = require('./routes/typeRouter');
// const brandRouter = require('./routes/brandRouter');
// const basketRouter = require('./routes/basketRouter');
const roleRouter = require('./routes/roleRouter');
const userLogRouter = require('./routes/userLogRouter');
const userRouter = require('./routes/userRouter');
const { error } = require('console');

app.use(express.json());
app.use(cors());               
app.use(express.urlencoded({extended: true}));

// localhost
app.use('/role', roleRouter);
app.use('/userlog', userLogRouter);
app.use('/user', userRouter);
// app.use('/users', userRouter);
// app.use('/device', deviceRouter);
// app.use('/type', typeRouter);
// app.use('/brand', brandRouter);
// app.use('/basket', basketRouter);

app.use(express.static(path.join(__dirname,'/client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.use(errorHandler);
