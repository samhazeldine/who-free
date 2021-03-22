const { event:container } = require('../config').containers;

async function getById (req, res) {
    const id = req.params.event_id;
    const querySpec = {
        query: "SELECT * from c WHERE c.id = @id",
        parameters: [
            {"name": "@id", "value": id}
        ]
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

async function create (req, res) {
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

module.exports = {getById, create};