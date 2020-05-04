let viewModel = {
    listOfProcesses: ko.observableArray([]),
    listOfTypes: ko.observableArray([]),
    listOfStatuses: ko.observableArray([]),
    listOfProjects: ko.observableArray([]),
    
    currentProcess: ko.observable(null),
    currentType: ko.observable(null),
    currentStatuses: ko.observableArray([]),
    currentProjects: ko.observableArray([])
};


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

//viewModel.loadProjects();
//viewModel.loadProcesses();
//viewModel.loadWorkItems();