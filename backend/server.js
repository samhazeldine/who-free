const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const {port} = require('./config');
const availailityRoutes = require('./routes/availabilityRouter');
const eventRoutes = require('./routes/eventRouter');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


app.use('/api/availability', availailityRoutes);
app.use('/api/event', eventRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log('Express is running at port ' + port);
})