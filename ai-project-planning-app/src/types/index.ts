export interface Project {
    id: string;
    name: string;
    description: string;
    tasks: Task[];
    startDate: Date;
    endDate: Date;
    status: 'not started' | 'in progress' | 'completed';
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: Date;
    status: 'not started' | 'in progress' | 'completed';
}