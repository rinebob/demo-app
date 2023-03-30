
export enum TaskStatus {
    PLANNING = 'planning',
    BACKLOG = 'backlog',
    NOT_STARTED = 'not started',
    DEVELOPMENT = 'development',
    REVIEW = 'review',
    NIGHTLY = 'nightly',
    STAGING = 'staging',
    PRODUCTION = 'production',
    DEPRECATED = 'deprecated',
}

export enum SubTaskStatus {
    NOT_STARTED = 'not started',
    DEVELOPMENT = 'development',
    COMPLETED = 'completed',
}

export interface Entity {
    // for mock data.  Will use firebase generated id when be is implemented
    // this id is generated by the in memory web api genId method
    id?: number | string;
    displayName: string;
}

export interface Task extends Entity {
    // entityId: string;
    // displayName: string;
    description: string;

    // change to string when firebase implemented
    boardId?: string | number;
    subTasks: SubTask[];
    // status: TaskStatus | string;
    status: TaskStatus | string;
}

export interface SubTask extends Entity {
    description: string;
    status: TaskStatus | string;
}

export interface Board extends Entity {
    // for mock data.  Will use firebase generated id when be is implemented
    // entityId: string;
    // displayName: string;
    description: string;
    status?: TaskStatus | string;
    // tasks: string[];
    tasks?: Task[];
}

export interface Column {
    id: number;
    name: string;
    order: number;
    display?: boolean;
}

export enum FormMode {
    CREATE = 'create',
    EDIT = 'edit',
}

export interface SortedTasks {
    [key: string]: Task[];
}

export interface SortedTasksWithColumns {
    allocatedTasks: SortedTasks;
    // columns: Column[];
}

export interface ColumnOrder {
    [key: string]: number;
}

export interface ColumnColor {
    [key: string]: string;
}

export enum DialogCloseResult {
  EDIT_BOARD = 'edit-board',
  DELETE_BOARD = 'delete-board',
  CREATE_BOARD_COMPLETE = 'create-board-complete',
  CREATE_BOARD_CANCELLED = 'create-board-cancelled',
  EDIT_BOARD_COMPLETE = 'edit-board-complete',
  EDIT_BOARD_CANCELLED = 'edit-board-cancelled',
  DELETE_BOARD_COMPLETE = 'delete-board-complete',
  DELETE_BOARD_CANCELLED = 'delete-board-cancelled',
  VIEW_TASK_CANCELLED = 'view-task-cancelled',
  CREATE_TASK_COMPLETE = 'create-task-complete',
  CREATE_TASK_CANCELLED = 'create-task-cancelled',
  EDIT_TASK = 'edit-task',
  EDIT_TASK_COMPLETE = 'edit-task-complete',
  EDIT_TASK_CANCELLED = 'edit-task-cancelled',
  DELETE_TASK = 'delete-task',
  DELETE_TASK_COMPLETE = 'delete-task-complete',
  DELETE_TASK_CANCELLED = 'delete-task-cancelled',
  COLUMN_SETTINGS_COMPLETE = 'column-settings-complete',
  COLUMN_SETTINGS_CANCELLED = 'column-settings-cancelled',
  SET_SELECTED_BOARD = "SET_SELECTED_BOARD",
  OPEN_CREATE_BOARD_DIALOG = "OPEN_CREATE_BOARD_DIALOG",
  TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE"
}

export interface DialogData {
    boardId?: number;
    board?: Board;
    task?: Task;
    allColumns?: Column[];
    userColumns?: Column[];
    numTasksByColumn?: {[key: string]: number},
    boardNames?: string[],
    darkModeOn?: boolean,
    theme?: string;
    selectedBoard?: string;
  }

  export interface DialogResult {
    outcome: DialogCloseResult | string;
    selectedBoard?: string;
}

  export const TASK_STATUS_VALUES = Object.values(TaskStatus);

  export enum AngExpRoutes {
    DRAG_DROP = 'drag-drop',
    ANIMATIONS = 'animations',
    SIGNALS = 'signals',
    FORM_ARRAY = 'form-array',
  }

  export interface NavButtonConfig {
    routerLink: string;
    text: string;
  }

  export interface SkillData {
    title: string;
    imageSrc: string;
    skills: string[];
  }

  export interface ProjectData {
    title: string;
    description: string;
    imageSrc: string;
  }

  export interface ExperienceData {
    employer: string;
    tenure: string;
    title: string;
    headline: string;
    description: string;
    assignments: Assignment[];
  }

  export interface Assignment {
    title: string;
    description: string;
    tasks: ExperienceTask[];
  }

  export interface ExperienceTask {
    description: string;
  }

  export interface WelcomeButton {
    url: string;
    text: string;
  }