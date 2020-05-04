const batchSizeThreshold = 200; 
const columns = [
    "System.AreaPath",
    "System.IterationPath",
    "System.State",
    "System.BoardColumn",
    "System.TeamProject",
    "System.Title",
    "System.WorkItemType",
    "System.AssignedTo" // displayName, imageUrl
];

let model = {
    api: null
};

model.init = async function(connection) {
    model.api = await connection.getWorkItemTrackingApi();
}

model.getWorkItemIds = async function() {
    let query = `SELECT ${columns.join(",")} FROM WorkItems`;

    let workItemsIds = (await api.queryByWiql({query: query}))
        .workItems
        .map(workItem => { 
            return workItem.id
        });

    return workItemsIds;
}

model.getWorkItemsByIds = async function(ids) {
    let batchInitial = [];
    batchInitial.push([]);

    let batchedIds = ids
        .reduce((accumulator, current) => {
            let currentBatch = accumulator[accumulator.length - 1];
            if (currentBatch.length >= batchSizeThreshold) {
                currentBatch = [];
                accumulator.push(currentBatch);
            }
            currentBatch.push(current);
            return accumulator;
        }, batchInitial);

    let queries = batchedIds.map(batch => {
        return api.getWorkItems(batch, columns);
    });

    return (await Promise.all(queries))
        .reduce((accumulator, current) => {
            return accumulator.concat(current);
        }, []);
}

module.exports = model;