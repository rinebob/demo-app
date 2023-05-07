
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
    ownerUid?: string;   // the auth.uid given to each registered user
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

export interface BoardsState {
  boards: Board[];
  selectedBoard: Board;
  tasks: Task[];
  allTasksByStatus: SortedTasks;
  allColumns: Column[];
  allColumnsWithTasks: Column[];
  userSelectedColumns: Column[];
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

  export enum AppRoutes {
    LOGIN = 'login',
    LOGOUT = 'logout',
    ROBERT = 'robert',
    KANBAN = 'kanban',
    CHARTS = 'charts',
    TRADER = 'trader',
    ANG_EXP = 'ang-exp',
    CUBIC_BEZIER = 'cubic-bezier',
    BIODATA = 'biodata',
    MAT_THEME = 'mat-theme',
    DESIGN_SYSTEM = 'design-system',
    AUDIO = 'audio',
  }

  export enum AngExpRoutes {
    DRAG_DROP = 'drag-drop',
    ANIMATIONS = 'animations',
    SIGNALS = 'signals',
    FORM_ARRAY = 'form-array',
    CSS_TRICKS = 'css-tricks',
    CSS_GRID = 'css-grid',
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
    route: string;
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

  export interface ButtonMetadata {
    url: string;
    fragment?: string;
    text: string;
  }

  export interface ComingSoonMetadata {
    introText: string;
    title: string;
    description: string;
    screenshot: string;
  }
  export enum RinebobSite {
    KANBAN_APP = 'kanban-app',
    TRADING_VIEW_APP = 'trading-view-app',
    CUBIC_BEZIER_APP = 'cubic-bezier-app',
    BIO_DATA_APP = 'bio-data-app',
  }

  export interface ComingSoonDict {
    [key: string]: ComingSoonMetadata;
  }

  export enum TourStop {
    INTRO = 'intro',
    START = 'start',
    CREATE_BOARD = 'create-board',
    EDIT_BOARD = 'edit-board',
    CREATE_TASK = 'create-task',
    VIEW_TASK = 'view-task',
    EDIT_TASK = 'edit-task',
    SET_STATUS = 'set-status',
    DELETE_TASK = 'delete-task',
    MOVE_TASK = 'move-task',
    CONFIGURE_COLUMNS = 'configure-columns',
  }

  export interface GuidedTourMetadata {
    title: string;
    description: string;
    top: string;
    left: string;
    pointerTop: string;
    pointerLeft: string;
    order: number;
  }

  export interface GuidedTourDict {
    [key: string | number]: GuidedTourMetadata;
  }

  export interface IconNavBarLink {
    name: string;
    icon: string;
    linkText: string;
  }

  export enum AppTheme {
    APP_LIGHT = 'app-light-theme',
    APP_DARK = 'app-dark-theme',
    LANDING_PAGE_LIGHT = 'landing-page-light-theme',
    LANDING_PAGE_DARK = 'landing-page-dark-theme',
    ANG_EXP_LIGHT = 'ang-exp-light-theme',
    ANG_EXP_DARK = 'ang-exp-dark-theme',
    KANBAN_LIGHT = 'kanban-light-theme',
    KANBAN_DARK = 'kanban-dark-theme',
    FALLBACK_LIGHT = 'fallback-light-theme',
    FALLBACK_DARK = 'fallback-dark-theme',
  }

  export interface Login {
    username: string;
    password: string;
}
export interface UserAccount extends Login {
    emailAddress: string;
}

export type ViewMode = 'light' | 'dark' | 'css-tricks';

export interface Contact {
  name: string;
  email: string;
  message: string;
}

export enum LandingPageSection {
  SKILLS = 'skills',
  PROJECTS = 'projects',
  EXPERIENCE = 'recent experience',
  CONTACT = 'contact',
}

export enum RinebobUrl {
  GITHUB = 'https://github.com/rinebob',
  LINKED_IN = 'https://www.linkedin.com/in/robert-rinehart',
}

export enum LpScrollTargetId {
  SCROLL_TARGET = 'scroll-target',
  WELCOME = 'welcome',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  CONTACT = 'contact',
}