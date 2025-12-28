export type Status = "cancelled" | "pending" | "inProgress" | "finished";

export interface Task {
    description: string;
    status: string;
    priority: number;
}
