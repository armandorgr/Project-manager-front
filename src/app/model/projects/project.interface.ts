export enum ProjectRole{
    ADMIN = 'ADMIN', USER = 'USER'
}

export interface Project {
    id:          string;
    name:        string;
    description: string;
    startDate?:   Date;
    endDate?:     Date;
    role?: ProjectRole
}
