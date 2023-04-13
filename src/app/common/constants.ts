import { Assignment, ProjectData, SkillData, AngExpRoutes, Board, ColumnColor, ColumnOrder, ExperienceData, NavButtonConfig, SortedTasks, Task, TaskStatus, ButtonMetadata, ComingSoonMetadata, ComingSoonDict, RinebobSite, IconNavBarLink, AppRoutes, GuidedTourDict, TourStop } from "./interfaces";


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
    {routerLink: AngExpRoutes.DRAG_DROP, text: 'cdk drag drop' },
    {routerLink: AngExpRoutes.FORM_ARRAY, text: 'form array'},
    {routerLink: AngExpRoutes.ANIMATIONS, text: 'animations'},
    {routerLink: AngExpRoutes.SIGNALS, text: 'signals'},
    {routerLink: AngExpRoutes.CSS_TRICKS, text: 'css tricks'},
];

export const BOARDS_COLLECTION = 'boards';
export const TASKS_COLLECTION = 'tasks';

export const RINEBOB_SKILLS: SkillData[] = [
    {title: 'Angular', imageSrc: '../../../assets/angular.png', skills: [
        'Core', 'Common', 'Forms', 'Http client', 'Router', 'Animations', 'CLI',
    ]},
    {title: 'Typescript', imageSrc: '../../../assets/ts-logo-128.png', skills: [
        'Interfaces', 'Enums', 'Utility types', 'Type narrowing'
    ]},
    {title: 'RxJs', imageSrc: '../../../assets/rxjs-logo.png', skills: [
        'Observables', 'Behavior subjects', 'Operators', 'Multi-cast',
    ]},
    {title: 'NgRx', imageSrc: '../../../assets/ngrx.png', skills: [
        'Global store', 'Effects', 'Component store',
    ]},
    {title: 'Material', imageSrc: '../../../assets/material.png', skills: [
        'All components', 'CDK', 'Drag-drop', 'Overlay', 'Component theming',
    ]},
    {title: 'Sass', imageSrc: '../../../assets/sass-logo2.png', skills: [
        'Variables', 'Mixins', 'Formulas', 'Interpolation',
    ]},
    {title: 'Firebase', imageSrc: '../../../assets/firebase-logo.png', skills: [
        'Auth', 'Firestore', 'Hosting', 'Storage', 'Cloud functions',
    ]},
    {title: 'Git', imageSrc: '../../../assets/github-mark.png', skills: [
        'All commands',
    ]},
    {title: 'D3', imageSrc: '../../../assets/d3-logo.png', skills: [
        
    ]},
    {title: 'HTML', imageSrc: '../../../assets/html-logo2.png', skills: [
        
    ]},
    {title: 'CSS', imageSrc: '../../../assets/css-logo2.png', skills: [
        
    ]},
    {title: 'Javascript', imageSrc: '../../../assets/javascript-logo2.png', skills: [
        
    ]},
];

export const RINEBOB_PROJECTS: ProjectData[] = [
    {
        title: 'Kanban style Todo App',
        description: 'Manage software development projects from planning to production.  Full backend support through Firebase.  Material CDK drag-drop.',
        route: '/kanban',
        imageSrc: '../../assets/DemoApp3.png',
    },
    // {
    //     title: 'Stock market charting site clone',
    //     description: 'Clone of tradingview.com stock charting website.  Extensive D3 implementation for rendering stock prices, scales, indicators and other data.',
    //     route: '/charts',
    //     imageSrc: '',
    // },
    // {
    //     title: 'Cubic-bezier animations site clone',
    //     description: 'Clone of cubic-bezier.com site.  Just because it looks cool.  Canvas, D3, Material components, copy to clipboard',
    //     route: '/cubic-bezier',
    //     imageSrc: '',
    // },
    // {
    //     title: 'Bio data app',
    //     description: 'Personal health data tracking and monitoring app.  Deployed on Firebase with full backend support.  Firebase auth, firestore, deployment.  Material components, D3.',
    //     route: '/biodata',
    //     imageSrc: '',
    // },
];

export const RINEBOB_EXPERIENCE: ExperienceData[] = [
    {
        employer: 'EPAM Systems, Inc. – Newtown, PA',
        tenure: 'August 2019 to February 2023',
        title: 'Senior Software Engineer',
        headline: 'Frontend developer assigned to Google (Sunnyvale, CA) account.',
        description: '',
        assignments: [
            {
                title: 'Assignment: Taara Share (Project X) - March 2021 - December 2022',
                description: 'As part of Google’s NBU (next billion users) initiative, Taara Share partners with local internet providers to offer low-cost direct-to-consumer commercial internet service in third-world countries beginning in Africa (Ghana and Kenya).',
                tasks: [
                    {
                        description: 'Sole developer for ‘ISP Portal’ application.  Built an externally visible Angular/Typescript application enabling Taara Share ISP partners to view and manage Hotspot locations, bandwidth Resellers and Customers.'
                    },
                    {
                        description: 'Designed and built a modularized Angular/Typescript architecture that supports reusable and extendable components including Material Table, Autocomplete search, create/edit dialogs and dynamically instantiating components enabling rapid development of create, edit, search, list and other features.'
                    },
                    {
                        description: 'This architecture allows developers to build one abstract/base component, then reuse that component and logic in multiple derived implementations without re-implementing the same/similar logic/html for each use case, saving substantial development time and effort.'
                    },
                    
                ],
            },
            {
                title: "Assignment: 'Resource Symphony' Team - August 2019 - February 2021",
                description: 'Part of a team of six frontend developers building a mission-critical dashboard offering insight into cloud infrastructure resources.  Built features including:',
                tasks: [
                    {
                        description: 'A Material Card-based display showing resource capacity ceiling, allocation, usage and efficiency.  Cards provided capabilities such as real-time updates, hover overlay, sparklines and drilldown for deeper visibility.'
                    },
                    {
                        description: 'Graphs of time-series using an internal D3-based charting library (Aplos).  Graphs show ceiling, allocation, usage, and efficiency across all regions, product areas and clusters.  Individual time series could be drilled down, filtered, highlighted.  Crosshairs and overlay cards display data for a specific point in time.'
                    },
                ],
            },
        ],
    },
];

export const APP_SIDENAV_BUTTONS: ButtonMetadata[] = [
    {url: AppRoutes.ROBERT, text: 'home'},
    {url: AppRoutes.KANBAN, text: 'kanban todo app'},
    // {url: AppRoutes.CHARTS, text: 'trading view chart clone'},
    // {url: AppRoutes.CUBIC_BEZIER, text: 'cubic-bezier site clone'},
    // {url: AppRoutes.BIODATA, text: 'bio data app'},
    // {url: AppRoutes.ANG_EXP, text: 'ng experiments'},
    // {url: AppRoutes.MAT_THEME, text: 'mat theme'},
    // {url: AppRoutes.DESIGN_SYSTEM, text: 'design system'},
];

export const WELCOME_BUTTONS: ButtonMetadata[] = [
    {url: '/robert', fragment: 'skills', text: 'skills'},
    {url: '/robert', fragment: 'projects', text: 'projects'},
    {url: '/robert', fragment: 'experience', text: 'experience'},
    {url: '/robert', fragment: 'contact', text: 'contact'},
];

export const COMING_SOON_METADATA: ComingSoonDict  = {
    [RinebobSite.TRADING_VIEW_APP]: {
        introText: 'Coming very soon',
        title: 'trading view stock charting website clone',
        description: 'This is a very cool site where you can create charts of stock prices over time.  You can overlay the chart with various indicators that show price averages, volume, momentum and other details.',
        screenshot: 'trading view screenshot url',
    },
    [RinebobSite.CUBIC_BEZIER_APP]: {
        introText: 'Coming after trading view clone',
        title: 'cubic-bezier site clone',
        description: 'This site looks like a fun project.  User can create css strings for cubic-bezier animations by modifying a cubic bezier curve.  Several curves can be created and compared, then exported for use in a site implementation.',
        screenshot: 'cubic bezier url',
    },
    [RinebobSite.BIO_DATA_APP]:{
        introText: 'Future plan',
        title: 'biometric data app',
        description: 'This app will enable a user to track personal health data such as blood pressure, pulse, weight, body fat, BMI and other data.  Data can then be viewed in charts with various statistical analysis capabilities.',
        screenshot: 'bio data url',
    },
}

export const COMING_SOON_INITIALIZER: ComingSoonMetadata  = {
    introText: '',
    title: '',
    description: '',
    screenshot: '',
};

export const ICON_NAV_BAR_LINKS: IconNavBarLink[] = [
    {name: 'home', icon: 'home', linkText: 'home'},
    {name: 'profile', icon: 'person', linkText: 'profile'},
    {name: 'message', icon: 'chat', linkText: 'message'},
    {name: 'photos', icon: 'photo_camera', linkText: 'photos'},
    {name: 'settings', icon: 'settings', linkText: 'settings'},
    // {name: '', icon: '', linkText: ''},
];

export const GUIDED_TOUR_TEXT: GuidedTourDict = {
    [1]: {
            title: 'Introduction',
            description: `The Kanban Todo app lets you track any software project from design to production.  Start by creating a project (called a board) and then adding tasks as needed.  As work progresses on each task, update the status to show where the task is in the process.  You can also add subtasks to each task.

            If you registered with a named account, all your work will be saved and available whenever you need it.  Guest accounts are removed after seven days.
            
            You can edit Board details or delete a board by clicking the menu icon in the upper right corner.
            
            To update progress on a task, simply drag it from one column to another.  This will update the task status automatically.  
            
            You can view a task by clicking on it in the kanban board, and edit / delete a task by clicking the menu icon in the upper right of each task card.
            
            Configuring your board columns is easy.  Just click on the Columns button in the right side or open the upper right menu and click the Configure columns button.  Choose the columns you want to view and change their display order by dragging a column name up or down in the list.
            
            Toggle light/dark mode using the button in the lower left.
            `,
            top: '',
            left: '',
            pointerTop: '',
            pointerLeft: '',
            order: 1,
        },
    [2]: {
            title: 'getting started',
            description: `When you first open the Kanban Todo app you’ll see all your existing boards in the menu on the left (click the button in the lower left if the menu isn't visible).  The currently selected board name will be highlighted.  We’ve provided some mock data so you get an idea.\n
            \n
            The main view area shows a kanban style layout of all the tasks for that project.  Tasks are arranged in columns based on their current status.`,
            top: '10%',
            left: '40%',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 2,
        },
    [3]: {
            title: 'create a board',
            description: 'Start by creating a board (click the Create Board button to the left).  Give it a name and optional description and click save.  You’ll see your new board in the list to the left.  Select a board to view by clicking on it in the list.',
            top: '23%',
            left: '8%',
            pointerTop: '66px',
            pointerLeft: '-20px',
            order: 3,
        },
    [4]: {
            title: 'edit / delete a board',
            description: `If you want to edit board details or delete a board, just click the menu in the upper right and select your desired option.  A dialog will open to help you.`,
            top: '16%',
            left: 'calc(90% - 240px)',
            pointerTop: '-20px',
            pointerLeft: '220px',
            order: 4,
        },
    [5]: {
            title: 'create a task',
            description: `A new board won’t have any tasks.  Click the create task button to create your first task for your board.  Give it a title and description and select a status at the bottom.  You can also add as many subtasks as you like.  Click save and the task will appear in the proper status column .  Note that if the column for the status you select isn’t currently displayed, you won’t see the new task.  Click configure columns to enable that column.`,
            top: '16%',
            left: 'calc(90% - 240px)',
            pointerTop: '-20px',
            pointerLeft: '188px',
            order: 5,
        },
    [6]: {
            title: 'view a task',
            description: `Once you’ve created a task you’ll see it in the kanban view.  Click on any task card right now to see details.  With the dialog open, click on the menu button in the upper right to edit or delete a task.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '92px',
            pointerLeft: '-20px',
            order: 6,
        },
    [7]: {
            title: 'edit a task',
            description: `You can change the title, description, status and add/edit/delete subtasks.  Click save to close the dialog and see the results.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 7,
        },
    [8]: {
            title: 'set task status',
            description: `Changing the status will move the task to a different column.  You’ll see this after you close the dialog.  Make sure the column you choose is displayed otherwise you might not see the task in it’s updated status column.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 8,
        },
    [9]: {
            title: 'delete a task',
            description: `From the Kanban view, click on a task card to open the View Task dialog, then click the menu in the upper right and select the delete option.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 9,
        },
    [10]: {
            title: 'move a task to different status',
            description: `In the Kanban view, you can update task status simply by dragging a task card from one column to another.  If the status you want to move the task to isn’t visible, open the Configure columns dialog to enable that column.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 10,
        },
    [11]: {
            title: 'configure column layout',
            description: `To configure the column layout, click the menu button in the upper right and select the configure columns option, or click the button in the right-most column of the Kanban view.  From there you can select which columns you want to view by checking/unchecking a column.  You can change the display order by dragging a column up or down in the list.  You can quickly select all column, only columns with tasks, or clear all columns using the buttons provided.`,
            top: '10%',
            left: 'calc(50% - 240px)',
            pointerTop: '50%',
            pointerLeft: '50%',
            order: 11,
        },
    // '': {
    //         title: '',
    //         description: ``,
    //         top: '',
    //         left: '',
    //         order: 0,
    //     },
};

export const EMPTY_BOARD_TEXT = 'This board is empty.  Create a new task to get started.';

export const WELCOME_TEXT = 'I\'m a frontend developer specializing in Angular and the Angular ecosystem.  I really love working with Angular!  It\'s amazing how easily you can bring your ideas to the web no matter how big or small.  I\'m super excited and eager to join an Angular team and make an important contribution on a special project!';
