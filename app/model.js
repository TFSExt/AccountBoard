const azdev = require("azure-devops-node-api");

const WorkItemTrackingProcessInterfaces = require("azure-devops-node-api/interfaces/WorkItemTrackingProcessInterfaces")

const model = { };

let organizationUrl = "";
let token = "";

let auth = azdev.getPersonalAccessTokenHandler(token);
let connection = new azdev.WebApi(organizationUrl, auth);

model.getProjects = async function() {
    let api = await connection.getCoreApi();
    return await api.getProjects();
}

model.getProcesses = async function() {
    let api = await connection.getWorkItemTrackingProcessApi();
    return await api.getListOfProcesses(WorkItemTrackingProcessInterfaces.GetProcessExpandLevel.Projects);
}

model.getWorkItemStates = async function() {

}

model.getWorkItemIds = async function() {
    let api = await connection.getWorkItemTrackingApi();
    let columns = [
        "System.AreaPath",
        "System.IterationPath",
        "System.State",
        "System.BoardColumn",
        "System.TeamProject",
        "System.Title",
        "System.WorkItemType",
        "System.AssignedTo" // displayName, imageUrl
    ];

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

    let batchSizeThreshold = 200;

    let columns = [
        "System.AreaPath",
        "System.IterationPath",
        "System.State",
        "System.BoardColumn",
        "System.TeamProject",
        "System.Title",
        "System.WorkItemType",
        "System.AssignedTo" // displayName, imageUrl
    ];

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

    let api = await connection.getWorkItemTrackingApi();

    let queries = batchedIds.map(batch => {
        return api.getWorkItems(batch, columns);
    });

    return (await Promise.all(queries))
        .reduce((accumulator, current) => {
            return accumulator.concat(current);
        }, []);
}