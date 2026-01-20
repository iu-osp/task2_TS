export type Status = "cancelled" | "pending" | "inProgress" | "finished";

export interface Task {
    id: number;
    description: string;
    status: string;
    priority: number;
}
