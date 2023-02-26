import { Board, Entity, Task, TaskStatus } from '../common/interfaces';


export function buildBoardsAndTasks(boardsSource: Board[], tasksSource: Task[]) {
    let boards: Board[] = [];
    let tasks: Task[] = [];
    
    for (const board of boardsSource) {
      const boardId = board.id;
    //   console.log('tU bBAT board/id: ', board, boardId);
      for (const task of tasksSource) {
        // console.log('tU bBAT pre taskId: ', task.entityId);
        const newTask: Task = {
          id: task.id,
          displayName: task.displayName,
          description: task.description,
          boardId: boardId,
          subTasks: task.subTasks,
          status: board.status === TaskStatus.NOT_STARTED ? TaskStatus.NOT_STARTED : task.status,
        }
        // console.log('tU bBAT post taskId: ', newTask.entityId);

        // board.tasks.push(newTask.id);
        board.tasks?.push(newTask);
        
        tasks.push(newTask);
      }

      boards.push(board);
    }
    console.log('tU bBAT boards/tasks: ', boards, tasks);

    // newTasks = generateId(newTasks);

    return {boards, tasks};
  }

  export function getTasksFromBoard(board: Board) {
    return board.tasks;

  }


