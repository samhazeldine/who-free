const { event:container } = require('../config').containers;

async function getEvent (req, res) {
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

module.exports = {getEvent};