let model = {
    api: null
};

model.init = async function(connection) {
    model.api = await connection.getCoreApi();
}

model.getProjects = async function() {
    return await api.getProjects();
}

module.exports = model;