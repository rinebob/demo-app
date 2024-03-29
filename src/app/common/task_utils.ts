import { Board, Column, SortedTasks, SubTask, Task, TaskStatus } from '../common/interfaces';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_ORDER_FROM_STATUS } from './constants';

export function buildBoardsAndTasks(boardsSource: Board[], tasksSource: Task[], subTasksSource: SubTask[]) {
    let boards: Board[] = [];
    let tasks: Task[] = [];
    // console.log('tU bBAT taskSource: ', tasksSource);
    
    for (const board of boardsSource) {
      const boardId = board.id;
      // console.log('tU bBAT board/id: ', board, boardId);
      for (const task of tasksSource) {
        const newTask: Task = {
          displayName: `${board.displayName} - ${task.displayName}`,
          description: task.description,
          boardId: boardId,
          subTasks: [...subTasksSource],
          status: board.status === TaskStatus.NOT_STARTED ? TaskStatus.NOT_STARTED : task.status,
        }
        // console.log('tU bBAT new task: ', {...newTask});

        tasks.push(newTask);
      }

      boards.push(board);
    }
    // console.log('tU bBAT boards/tasks: ', boards, [...tasks]);

    return {boards, tasks};
  }

  export function getTasksFromBoard(board: Board) {
    return board.tasks;

  }

  export function allocateTasksToColumns(tasks: Task[]): SortedTasks {
    const allocatedTasks: SortedTasks = {...ALLOCATED_TASKS_INITIALIZER};
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
        // console.log('tU aTTC status/values: ', status, statusValues);
        // console.log('tU aTTC allocTasks start: ', allocatedTasks);
        let existingTasks = allocatedTasks[status] ?? [];
        // console.log('tU aTTC existing tasks: ', existingTasks);
        
        if (existingTasks?.length) {
          // console.log('tU aTTC existing tasks: ', existingTasks);
          existingTasks.push(task);
        } else {
          // console.log('tU aTTC no existing tasks yet');
          existingTasks = [task];
          // console.log('tU aTTC first existing task: ', existingTasks);
        }
        allocatedTasks[status] = existingTasks;
      }
      // console.log('tU aTTC allocTasks end: ', allocatedTasks);
    }
   
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

    columns.push({id: columns.length, name: 'new column', order: columns.length, display: true});
    // console.log('tU gACL all columns: ', columns);
    
    return columns;
  }

  export function updateColumnOrders(columns: Column[], previousIndex: number, newIndex: number ) {
    // console.log('tU uCO input columns: ', columns);
    const movedColumn = columns[previousIndex];
    const movedColumnOrder = movedColumn.order;

    columns.splice(previousIndex, 1);

    columns.splice(newIndex, 0, movedColumn);

    columns.forEach((column, i) => {
      column.order = i;
    });

    // console.log('tU uCO output columns: ', columns);

    return columns;
  }


