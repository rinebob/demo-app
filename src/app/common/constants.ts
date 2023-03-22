import { AngExpRoutes, Board, ColumnColor, ColumnOrder, NavButtonConfig, SortedTasks, Task, TaskStatus } from "./interfaces";


export const BOARD_INITIALIZER: Board = {
    displayName: '',
    description: '',
    status: TaskStatus.NOT_STARTED,
    tasks: [],
}

export const TASK_INITIALIZER: Task = {
    displayName: '',
    description: '',
    boardId: -1,
    subTasks: [],
    status: TaskStatus.NOT_STARTED,
}

export const ALLOCATED_TASKS_INITIALIZER: SortedTasks = {
    [TaskStatus.PLANNING]: [],
    [TaskStatus.BACKLOG]: [],
    [TaskStatus.NOT_STARTED]: [],
    [TaskStatus.DEVELOPMENT]: [],
    [TaskStatus.REVIEW]: [],
    [TaskStatus.NIGHTLY]: [],
    [TaskStatus.STAGING]: [],
    [TaskStatus.PRODUCTION]: [],
    [TaskStatus.DEPRECATED]: [],
}

export const COLUMN_ORDER_FROM_STATUS: ColumnOrder = {
    [TaskStatus.PLANNING]: 0,
    [TaskStatus.BACKLOG]: 1,
    [TaskStatus.NOT_STARTED]: 2,
    [TaskStatus.DEVELOPMENT]: 3,
    [TaskStatus.REVIEW]: 4,
    [TaskStatus.NIGHTLY]: 5,
    [TaskStatus.STAGING]: 6,
    [TaskStatus.PRODUCTION]: 7,
    [TaskStatus.DEPRECATED]: 8,
    'new-column': 10,

}

export const COLUMN_COLOR: ColumnColor = {
    [TaskStatus.PLANNING]: '#49c4e5',
    [TaskStatus.BACKLOG]: '#8471f2',
    [TaskStatus.NOT_STARTED]: '#67e2ae',
    [TaskStatus.DEVELOPMENT]: '#49c4e5',
    [TaskStatus.REVIEW]: '#8471f2',
    [TaskStatus.NIGHTLY]: '#67e2ae',
    [TaskStatus.STAGING]: '#49c4e5',
    [TaskStatus.PRODUCTION]: '#8471f2',
    [TaskStatus.DEPRECATED]: '#67e2ae',

}

export const ANG_EXP_NAV_BUTTONS:NavButtonConfig[] = [
    {routerLink: AngExpRoutes.DRAG_DROP, text: 'cdk Drag Drop' },
    {routerLink: AngExpRoutes.FORM_ARRAY, text: 'Form array'},
    {routerLink: AngExpRoutes.ANIMATIONS, text: 'Animations'},
    {routerLink: AngExpRoutes.SIGNALS, text: 'Signals'},
];

export const BOARDS_COLLECTION = 'boards';
export const TASKS_COLLECTION = 'tasks';