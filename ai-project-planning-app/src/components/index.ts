class ProjectPlanner {
    private projects: { id: number; name: string; tasks: string[] }[] = [];
    private nextId: number = 1;

    createProject(name: string, tasks: string[]): void {
        const newProject = { id: this.nextId++, name, tasks };
        this.projects.push(newProject);
    }

    updateProject(id: number, name?: string, tasks?: string[]): void {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            if (name) project.name = name;
            if (tasks) project.tasks = tasks;
        }
    }

    deleteProject(id: number): void {
        this.projects = this.projects.filter(p => p.id !== id);
    }

    renderProjects(): void {
        this.projects.forEach(project => {
            console.log(`Project ID: ${project.id}, Name: ${project.name}, Tasks: ${project.tasks.join(', ')}`);
        });
    }
}

export default ProjectPlanner;