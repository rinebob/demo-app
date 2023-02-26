import { Board, TaskStatus } from "./interfaces";


export const BOARD_INITIALIZER: Board = {
    displayName: '',
    status: TaskStatus.NOT_STARTED,
    tasks: [],
}