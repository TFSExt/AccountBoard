const WorkItemTrackingProcessInterfaces = require("azure-devops-node-api/interfaces/WorkItemTrackingProcessInterfaces")

let model = {
    api: null
};

model.init = async function(connection) {
    model.api = await connection.getWorkItemTrackingProcessApi();
}

model.getProcesses = async function() {
    return await api.getListOfProcesses(WorkItemTrackingProcessInterfaces.GetProcessExpandLevel.Projects);
}

module.exports = model;