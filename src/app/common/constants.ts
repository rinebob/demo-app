import { Assignment, ProjectData, SkillData, AngExpRoutes, Board, ColumnColor, ColumnOrder, ExperienceData, NavButtonConfig, SortedTasks, Task, TaskStatus, WelcomeButton } from "./interfaces";


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
        imageSrc: '../../assets/DemoApp3.png',
    },
    {
        title: 'Stock market charting site clone',
        description: 'Clone of tradingview.com stock charting website.  Extensive D3 implementation for rendering stock prices, scales, indicators and other data.',
        imageSrc: '',
    },
    {
        title: 'Cubic-bezier animations site clone',
        description: 'Clone of cubic-bezier.com site.  Just because it looks cool.  Canvas, D3, Material components, copy to clipboard',
        imageSrc: '',
    },
    {
        title: 'Bio data app',
        description: 'Personal health data tracking and monitoring app.  Deployed on Firebase with full backend support.  Firebase auth, firestore, deployment.  Material components, D3.',
        imageSrc: '',
    },
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

export const WELCOME_BUTTONS: WelcomeButton[] = [
    {url: '', text: 'skills'},
    {url: '', text: 'projects'},
    {url: '', text: 'experience'},
    {url: '', text: 'contact'},
];