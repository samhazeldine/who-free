const { availability:container } = require('../config').containers;

async function getAvailability (req, res) {
    const querySpec = {
        query: "SELECT * from c"
    };

    try {
        const { resources: result } = await container
        .items
        .query(querySpec)
        .fetchAll();

        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

async function createAvailability (req, res) {    
    try {
        const {item} = await container
        .items
        .upsert(req.body);

        res.status(200).json(item.id);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
    
}

module.exports = {getAvailability, createAvailability};