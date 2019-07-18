let viewModel = { };

viewModel.loadProjects = function() {
    model.getProjects()
    .then(projects => {
        console.log(projects);
    });
}

viewModel.loadProcesses = function() {
    model.getProcesses()
    .then(processes => {
        console.log(processes);
    });
}

viewModel.loadWorkItems = function() {
    model.getWorkItemIds()
    .then(ids => {
        console.log(ids);
        return model.getWorkItemsByIds(ids);
    })
    .then(workItems => {
        console.log(workItems);
    })
}

viewModel.loadProjects();
viewModel.loadProcesses();
//viewModel.loadWorkItems();