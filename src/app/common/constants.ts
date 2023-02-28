import { Board, ColumnColor, ColumnOrder, SortedTasks, TaskStatus } from "./interfaces";


export const BOARD_INITIALIZER: Board = {
    displayName: '',
    status: TaskStatus.NOT_STARTED,
    tasks: [],
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
    [TaskStatus.PLANNING]: 1,
    [TaskStatus.BACKLOG]: 2,
    [TaskStatus.NOT_STARTED]: 3,
    [TaskStatus.DEVELOPMENT]: 4,
    [TaskStatus.REVIEW]: 5,
    [TaskStatus.NIGHTLY]: 6,
    [TaskStatus.STAGING]: 7,
    [TaskStatus.PRODUCTION]: 8,
    [TaskStatus.DEPRECATED]: 9,
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