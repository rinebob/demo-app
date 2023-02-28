import { Board, Task, TaskStatus } from '../common/interfaces';

// export interface Task {
//     displayName: string;
//     description: string;
//     boardId: string;
//     subTasks: string[];
//     status: TaskStatus;
// }

// export interface Board {
//     displayName: string;
//     status: string;
//     tasks: string[];
// }

// Angular In-memory web api requires id property to have number data type
// TODO: change to string data type to support firebase id when be implemented
export const DEMO_APP: Board = {
    id: 1,
    // entityId: 'demo-app',
    displayName: 'Demo app',
    status: TaskStatus.DEVELOPMENT,
    tasks: [],
}

export const TRACKER_APP: Board = {
    id: 2,
    // entityId: 'tracker-app',
    displayName: 'Bio data app',
    status: TaskStatus.DEVELOPMENT,
    tasks: [],
}

export const TRADING_VIEW_APP: Board = {
    id: 3,
    // entityId: 'trading-view-app',
    displayName: 'TradingView clone app',
    status: TaskStatus.DEVELOPMENT,
    tasks: [],
}

export const RAW_BOARDS: Board[] = [DEMO_APP, TRACKER_APP, TRADING_VIEW_APP];

export const SCAFFOLD_APP: Task = {
    id: 1,
    // entityId: 'scaffold-app',
    displayName: 'Scaffold app',
    description: 'Run the ng new command to create the application',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.STAGING,
}

export const IMPLEMENT_INTERFACES: Task = {
    id: 2,
    // entityId: 'implement-interfaces',
    displayName: 'Implement interfaces',
    description: 'In file common/interfaces.ts add interfaces for each entity the app tracks',
    boardId: 0,
    subTasks: [],
    status: TaskStatus.STAGING,
}

export const IMPLEMENT_TEST_DATA: Task = {
    id: 3,
    // entityId: 'implement-test-data',
    displayName: 'Implement test data',
    description: 'Code the test data for the app',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.STAGING,
}

export const IMPLEMENT_SERVICE: Task = {
    id: 4,
    // entityId: 'implement-service',
    displayName: 'Implement service',
    description: 'Implement the http service to call the backend',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.NIGHTLY,
}

export const IMPLEMENT_COMPONENT_STORE: Task = {
    id: 5,
    // entityId: 'implement-component-store',
    displayName: 'Implement component store',
    description: 'Implement a NgRx component store service for the main application view',
    boardId: 0,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const GENERATE_VIEW_COMPONENT: Task = {
    id: 6,
    // entityId: 'generate-view-component',
    displayName: 'Generate view component',
    description: 'Use the angular cli to generate the main view-level smart component',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const IMPLEMENT_VIEW_COMPONENT_LOGIC: Task = {
    id: 7,
    displayName: 'Implement View component logic',
    description: 'Implement logic for CRUDL operations in View component',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const IMPLEMENT_PRESENTATION_LAYER: Task = {
    id: 8,
    displayName: 'Implement presentation layer',
    description: 'Implement presentation components to show data in UI',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const CREATE_SASS_MIXINS: Task = {
    id: 9,
    displayName: 'Create Sass mixins for UI',
    description: 'Extract scss/css from individual components and create mixins for reusability',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const CREATE_SASS_VARIABLES: Task = {
    id: 10,
    displayName: 'Create Sass variables',
    description: 'Extract css values from component scss files and create variables in a shared file',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.DEVELOPMENT,
}

export const FIREBASE_PLANNING: Task = {
    id: 11,
    displayName: 'Firebase planning',
    description: 'Design Firebase architecture for entire app',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.PLANNING,
}

export const FIREBASE_SETUP: Task = {
    id: 12,
    displayName: 'Firebase setup',
    description: 'Add all necessary projects and infrastructure in Firebase account',
    boardId: 1,
    subTasks: [],
    status: TaskStatus.PLANNING,
}



export const RAW_TASKS: Task[] = [
    SCAFFOLD_APP,
    IMPLEMENT_INTERFACES,
    IMPLEMENT_TEST_DATA,
    IMPLEMENT_SERVICE,
    IMPLEMENT_COMPONENT_STORE,
    GENERATE_VIEW_COMPONENT,
    IMPLEMENT_VIEW_COMPONENT_LOGIC,
    IMPLEMENT_PRESENTATION_LAYER,
    CREATE_SASS_MIXINS,
    CREATE_SASS_VARIABLES,
    FIREBASE_PLANNING,
    FIREBASE_SETUP,
];

export const BOARDS: Board[] = [
    {
        "id": 1,
        "displayName": "Demo app",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 1,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 1,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "Implement test data",
                "description": "Code the test data for the app",
                "boardId": 1,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 1,
                "subTasks": [],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 1,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 1,
                "subTasks": [],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 1,
                "subTasks": [],
                "status": "planning"
            }
        ]
    },
    {
        "id": 2,
        "displayName": "Bio data app",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 2,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 2,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "Implement test data",
                "description": "Code the test data for the app",
                "boardId": 2,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 2,
                "subTasks": [],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 2,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 2,
                "subTasks": [],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 2,
                "subTasks": [],
                "status": "planning"
            }
        ]
    },
    {
        "id": 3,
        "displayName": "TradingView clone app",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 3,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 3,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "Implement test data",
                "description": "Code the test data for the app",
                "boardId": 3,
                "subTasks": [],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 3,
                "subTasks": [],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 3,
                "subTasks": [],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 3,
                "subTasks": [],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 3,
                "subTasks": [],
                "status": "planning"
            }
        ]
    }
]