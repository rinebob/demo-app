import { Board, Column, Entity, SortedTasks, SortedTasksWithColumns, SubTask, Task, TaskStatus } from '../common/interfaces';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_ORDER_FROM_STATUS } from './constants';


export function buildBoardsAndTasks(boardsSource: Board[], tasksSource: Task[], subTasksSource: SubTask[]) {
    let boards: Board[] = [];
    let tasks: Task[] = [];
    
    for (const board of boardsSource) {
      const boardId = board.id;
    //   console.log('tU bBAT board/id: ', board, boardId);
      for (const task of tasksSource) {
        // console.log('tU bBAT pre taskId: ', task.entityId);
        const newTask: Task = {
          id: task.id,
          displayName: `${board.displayName} - ${task.displayName}`,
          description: task.description,
          boardId: boardId,
          // subTasks: task.subTasks,
          subTasks: [...subTasksSource],
          status: board.status === TaskStatus.NOT_STARTED ? TaskStatus.NOT_STARTED : task.status,
        }
        // console.log('tU bBAT post taskId: ', newTask.entityId);

        // board.tasks.push(newTask.id);
        board.tasks?.push(newTask);
        
        tasks.push(newTask);
      }

      boards.push(board);
    }
    // console.log('tU bBAT boards/tasks: ', boards, tasks);

    return {boards, tasks};
  }

  export function getTasksFromBoard(board: Board) {
    return board.tasks;

  }

  export function allocateTasksToColumns(tasks: Task[]): SortedTasks {
    const allocatedTasks: SortedTasks = {...ALLOCATED_TASKS_INITIALIZER};
    // const allocatedTasks: SortedTasks = {};
    // const tasks = board.tasks ?? [];
    // const statusValues = new Set<string>(['new-column']);
    // console.log('tU aTTC input tasks: ', tasks);
    // console.log('tU aTTC start allocatedTasks: ', {...allocatedTasks});
    
    for (const key of Object.keys(allocatedTasks)) {
      allocatedTasks[key] = [];
      
      
    }
    // console.log('tU aTTC start allocatedTasks 2: ', {...allocatedTasks});

    if (tasks) {
      for (const task of tasks) {
        // console.log('--------------------------------------')
        // console.log('tU aTTC input task: ', task);
        const status = task.status;
        // statusValues.add(status);
        // console.log('tU aTTC status/values: ', status, statusValues);
        // console.log('tU aTTC allocTasks start: ', allocatedTasks);
        let existingTasks = allocatedTasks[status] ?? [];
        // console.log('tU aTTC existing tasks: ', existingTasks);
        
        if (existingTasks?.length) {
          // console.log('tU aTTC existing tasks: ', existingTasks);
          // const tasks = Object.values(existingTasks);
          // tasks.push(task);
          existingTasks.push(task);
          // this.allocatedTasks[status] = existingTasks;
        } else {
          // console.log('tU aTTC no existing tasks yet');
          existingTasks = [task];
          // console.log('tU aTTC first existing task: ', existingTasks);
        }
        allocatedTasks[status] = existingTasks;
      }
      // console.log('tU aTTC allocTasks end: ', allocatedTasks);
    }

    // const columns: Column[] = []
    // let id = 1;
    // for (const key of [...statusValues.keys()]) {
    //   const column: Column = {
    //     id,
    //     name: key,
    //     order: COLUMN_ORDER_FROM_STATUS[key],
    //   };
    //   columns.push(column);
    //   id ++;

    // }

    // const columns = [...statusValues.keys()];
    // console.log('tU aTTC keys: ', columns);
    // console.log('tU aTTC final columns/tasks by status map: ', columns, allocatedTasks);

    // for (const column of columns) {
      // console.log('tU aTTC column/tasks: ', column, allocatedTasks[column.name]);
    // }
    
    return allocatedTasks;
  }
  
  export function generateAllColumnsList(): Column[] {
    const columns: Column[] = []
    let id = 1;
    for (const key of [...Object.values(TaskStatus)]) {
      const column: Column = {
        id,
        name: key,
        order: COLUMN_ORDER_FROM_STATUS[key],
      };
      columns.push(column);
      id ++;
      
    }
    // console.log('tU gACL all columns: ', columns);
    
    return columns;
  }


