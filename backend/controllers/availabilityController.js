const { availability:container } = require('../config').containers;

const samItem = {
    name: 'Sam',
    dates : [
      '01/02/2021',
      '08/02/2021'
    ]
}

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
    console.log("post");
    const { item } = await container
        .items
        .upsert(samItem);
    console.log(`Created Sam item with ID` + item.id);
}

module.exports = {getAvailability, createAvailability};