const azdev = require("azure-devops-node-api");

const model = { };

let organizationUrl = "https://dev.azure.com/dtek-modus/";
let token = "r2gn6wivrizmkyuagcytqoctvolpkcuvabubqfubaovg2lqe3eoq";

let auth = azdev.getPersonalAccessTokenHandler(token);
let connection = new azdev.WebApi(organizationUrl, auth);

model.getWorkItemStates = async function() {
    var api = await connection.getWorkApi();
}
