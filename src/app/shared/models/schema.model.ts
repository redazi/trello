export interface Tag {
    name: string;
    color?: string;
}
export interface Talk {
    Id(Id: any): unknown;
    text: string;
    priority?: string;
    tags?: Tag[];
    image?: string;
    createdAt?: Date;
    issueType?: IssueType;
    users: User[]
}

// export interface Issue {
//     name: IssueType;
//     color: string;
// }

export enum IssueType {
    Task = 'task',
    SubTask = 'sub-task',
    Bug = 'bug',
    Epic = 'epic',
    Story = 'story'
}
export enum Priority {
    Low = 'Low',
    Lowest = 'Lowest',
    Medium = 'Medium',
    High = 'High',
    Highest = 'Highest'
}
export interface Track {
    id: string;
    title: string;
    talks: Talk[];
    
}

export interface Board {
    id: number;
    title: string;
    description: string;
    tracks: Track[];
    users: User[];
}
export interface User {
    id: number;
    name: string;
    initials: string;
  }
  export interface CheckListResponse {
    totalSize: number;
    done: boolean;
    records: any[]; // Update the type of records based on your data structure
  }