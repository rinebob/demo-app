import { SubTaskStatus } from '../common/interfaces';
import { SubTask } from '../common/interfaces';
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
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    status: TaskStatus.DEVELOPMENT,
    tasks: [],
}

export const TRACKER_APP: Board = {
    id: 2,
    // entityId: 'tracker-app',
    displayName: 'Bio data app',
    description: 'Quisquam assumenda neque maxime perspiciatis rerum debitis sit? Nobis sapiente eum ipsa?',
    status: TaskStatus.DEVELOPMENT,
    tasks: [],
}

export const TRADING_VIEW_APP: Board = {
    id: 3,
    // entityId: 'trading-view-app',
    displayName: 'TradingView clone app',
    description: 'A clone of the trading view app thats very cool',
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

export const SUBTASK_1: SubTask = {
    displayName: '',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    status: SubTaskStatus.COMPLETED,
}

export const SUBTASK_2: SubTask = {
    displayName: '',
    description: 'Sequi perspiciatis error repellat debitis sint impedit',
    status: SubTaskStatus.COMPLETED,
}

export const SUBTASK_3: SubTask = {
    displayName: '',
    description: ', quisquam asperiores. Debitis, qui omnis.',
    status: SubTaskStatus.DEVELOPMENT,
}

export const SUBTASK_4: SubTask = {
    displayName: '',
    description: ' Tempora repellat earum esse asperiores doloribus et maiores neque!',
    status: SubTaskStatus.DEVELOPMENT,
}

export const SUBTASK_5: SubTask = {
    displayName: '',
    description: 'Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ',
    status: SubTaskStatus.NOT_STARTED,
}

export const RAW_SUBTASKS = [SUBTASK_1, SUBTASK_2, SUBTASK_3, SUBTASK_4, SUBTASK_5];



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
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "Demo app - Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "Demo app - Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "Demo app - Implement test data",
                "description": "Code the test data for the app",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "Demo app - Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "Demo app - Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "Demo app - Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "Demo app - Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "Demo app - Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "Demo app - Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "Demo app - Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "Demo app - Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "Demo app - Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 1,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            }
        ]
    },
    {
        "id": 2,
        "displayName": "Bio data app",
        "description": "Quisquam assumenda neque maxime perspiciatis rerum debitis sit? Nobis sapiente eum ipsa?",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "Bio data app - Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "Bio data app - Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "Bio data app - Implement test data",
                "description": "Code the test data for the app",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "Bio data app - Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "Bio data app - Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "Bio data app - Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "Bio data app - Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "Bio data app - Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "Bio data app - Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "Bio data app - Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "Bio data app - Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "Bio data app - Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 2,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            }
        ]
    },
    {
        "id": 3,
        "displayName": "TradingView clone app",
        "description": "A clone of the trading view app thats very cool",
        "status": "development",
        "tasks": [
            {
                "id": 1,
                "displayName": "TradingView clone app - Scaffold app",
                "description": "Run the ng new command to create the application",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 2,
                "displayName": "TradingView clone app - Implement interfaces",
                "description": "In file common/interfaces.ts add interfaces for each entity the app tracks",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 3,
                "displayName": "TradingView clone app - Implement test data",
                "description": "Code the test data for the app",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "staging"
            },
            {
                "id": 4,
                "displayName": "TradingView clone app - Implement service",
                "description": "Implement the http service to call the backend",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "nightly"
            },
            {
                "id": 5,
                "displayName": "TradingView clone app - Implement component store",
                "description": "Implement a NgRx component store service for the main application view",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 6,
                "displayName": "TradingView clone app - Generate view component",
                "description": "Use the angular cli to generate the main view-level smart component",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 7,
                "displayName": "TradingView clone app - Implement View component logic",
                "description": "Implement logic for CRUDL operations in View component",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 8,
                "displayName": "TradingView clone app - Implement presentation layer",
                "description": "Implement presentation components to show data in UI",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 9,
                "displayName": "TradingView clone app - Create Sass mixins for UI",
                "description": "Extract scss/css from individual components and create mixins for reusability",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 10,
                "displayName": "TradingView clone app - Create Sass variables",
                "description": "Extract css values from component scss files and create variables in a shared file",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "development"
            },
            {
                "id": 11,
                "displayName": "TradingView clone app - Firebase planning",
                "description": "Design Firebase architecture for entire app",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            },
            {
                "id": 12,
                "displayName": "TradingView clone app - Firebase setup",
                "description": "Add all necessary projects and infrastructure in Firebase account",
                "boardId": 3,
                "subTasks": [
                    {
                        "displayName": "",
                        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": "Sequi perspiciatis error repellat debitis sint impedit",
                        "status": "completed"
                    },
                    {
                        "displayName": "",
                        "description": ", quisquam asperiores. Debitis, qui omnis.",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": " Tempora repellat earum esse asperiores doloribus et maiores neque!",
                        "status": "development"
                    },
                    {
                        "displayName": "",
                        "description": "Eligendi ad, cupiditate, placeat maxime voluptate nostrum qui odio nulla ",
                        "status": "not started"
                    }
                ],
                "status": "planning"
            }
        ]
    }
];
