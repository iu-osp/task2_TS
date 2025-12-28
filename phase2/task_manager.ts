import * as readline from 'node:readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

type StatusString = "cancelled" | "pending" | "inProgress" | "finished";
type StatusNumber = -1 | 0 | 1 | 2;

const status_map = new Map<string | number, string | number>();

const save_file:string = "save.json";

status_map.set("cancelled", -1);
status_map.set("pending", 0);
status_map.set("inProgress", 1);
status_map.set("finished", 2);

status_map.set(-1, "cancelled");
status_map.set(0, "pending");
status_map.set(1, "inProgress");
status_map.set(2, "finished");

class Task {
    description: string;
    status: StatusNumber;
    priority: number;

    constructor(description: string, priority?: number) {
        this.description = description;
        this.status = 0;
        this.priority = priority ?? 0;
    }
}

class TaskManager {
    tasks: Task[];

    constructor() {
        this.tasks = [];
    }

    get task_counter(): number {
        return this.tasks.length;
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    deleteTask(index: number): void {
        this.tasks.splice(index, 1);
    }

    editDescription(index: number, new_description: string): void {
        this.tasks[index].description = new_description;
    }

    editStatus(index: number, new_status: StatusNumber): void {
        this.tasks[index].status = new_status;
    }

    promoteTask(index: number, step: number): void {
        this.tasks[index].priority += step;
    }

    listTasks(): void {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            console.log(
            `${i + 1} ${task.description} ${status_map.get(task.status)} ${task.priority}`
            );
        }
    }

    load(): void {
        if (!fs.existsSync(save_file)) {
            this.tasks = [];
            return;
        }

        const content = fs.readFileSync(save_file, "utf-8");
        this.tasks = content.length === 0 ? [] : JSON.parse(content).tasks;
    }

    save(): void {
        fs.writeFileSync(save_file, JSON.stringify({ tasks: this.tasks }, null, 2));
    }
}

const TM = new TaskManager();

function cli(command: string): void {
    const parts = command.split(" ");

    switch (parts[0]) {
    case "add": {
        if (parts.length !== 3) {
            console.log("add 'desc: any' 'priority: int'");
            break;
        }

        const desc = parts[1];
        const priority = Number(parts[2]);

        if (isNaN(priority)) {
            console.log("priority must be a number");
            break;
        }

        TM.addTask(new Task(desc, priority));
        break;
    }

    case "delete": {
        if (parts.length !== 2) {
            console.log("delete 'task number: int'");
            break;
        }

        const index = Number(parts[1]);
        if (isNaN(index)) {
            console.log("task number must be a number");
            break;
        }

        TM.deleteTask(index - 1);
        break;
    }

    case "editd": {
        if (parts.length !== 3) {
            console.log("editd 'task number: int' 'new desc: any'");
            break;
        }

        const index = Number(parts[1]);
        if (isNaN(index)) {
            console.log("task number must be a number");
            break;
        }

        TM.editDescription(index - 1, parts[2]);
        break;
    }

    case "edits": {
        if (parts.length !== 3) {
            console.log(
                "edits 'task number: int' 'new status: cancelled/pending/inProgress/finished'"
            );
            break;
        }

        const index = Number(parts[1]);
        const new_status = status_map.get(parts[2]) as StatusNumber;

        if (isNaN(index) || new_status === undefined) {
            console.log("invalid input");
            break;
        }

        TM.editStatus(index - 1, new_status);
        break;
    }

    case "editp": {
        if (parts.length !== 3) {
            console.log("editp 'task number: int' 'priority offset: int'");
            break;
        }

        const index = Number(parts[1]);
        const step = Number(parts[2]);

        if (isNaN(index) || isNaN(step)) {
            console.log("numbers required");
            break;
        }

        TM.promoteTask(index - 1, step);
        break;
    }

    case "help":
    default:
        console.log("add 'desc: any' 'priority: int'");
        console.log("delete 'task number: int'");
        console.log("editd 'task number: int' 'new desc: any'");
        console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished'");
        console.log("editp 'task number: int' 'priority offset: int'");
        break;
    }

    TM.listTasks();
    TM.save();
}

function input(prompt: string): Promise<string> {
    return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main(): Promise<void> {
    TM.load();
    TM.listTasks();

    while (true) {
        const command = await input("");

        if (command === "exit") {
            rl.close();
            break;
        }

        console.clear();
        console.log('--');
        cli(command);
    }
}

main();
