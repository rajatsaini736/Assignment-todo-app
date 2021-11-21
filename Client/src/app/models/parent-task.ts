import { SubTask } from './sub-task';

export interface ParentTask {
    _id: string;
    task_name: string;
    overall_status: string;
    visibility: string;
    sub_tasks: [ SubTask ];
}
