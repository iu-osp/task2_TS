"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("node:readline");
var fs = require("fs");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var status_map = new Map();
var save_file = "save.json";
status_map.set("cancelled", -1);
status_map.set("pending", 0);
status_map.set("inProgress", 1);
status_map.set("finished", 2);
status_map.set(-1, "cancelled");
status_map.set(0, "pending");
status_map.set(1, "inProgress");
status_map.set(2, "finished");
var Task = /** @class */ (function () {
    function Task(description, priority) {
        this.description = description;
        this.status = 0;
        this.priority = priority !== null && priority !== void 0 ? priority : 0;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    Object.defineProperty(TaskManager.prototype, "task_counter", {
        get: function () {
            return this.tasks.length;
        },
        enumerable: false,
        configurable: true
    });
    TaskManager.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    TaskManager.prototype.deleteTask = function (index) {
        this.tasks.splice(index, 1);
    };
    TaskManager.prototype.editDescription = function (index, new_description) {
        this.tasks[index].description = new_description;
    };
    TaskManager.prototype.editStatus = function (index, new_status) {
        this.tasks[index].status = new_status;
    };
    TaskManager.prototype.promoteTask = function (index, step) {
        this.tasks[index].priority += step;
    };
    TaskManager.prototype.listTasks = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            console.log("".concat(i + 1, " ").concat(task.description, " ").concat(status_map.get(task.status), " ").concat(task.priority));
        }
    };
    TaskManager.prototype.load = function () {
        if (!fs.existsSync(save_file)) {
            this.tasks = [];
            return;
        }
        var content = fs.readFileSync(save_file, "utf-8");
        this.tasks = content.length === 0 ? [] : JSON.parse(content).tasks;
    };
    TaskManager.prototype.save = function () {
        fs.writeFileSync(save_file, JSON.stringify({ tasks: this.tasks }, null, 2));
    };
    return TaskManager;
}());
var TM = new TaskManager();
function cli(command) {
    var parts = command.split(" ");
    switch (parts[0]) {
        case "add": {
            if (parts.length !== 3) {
                console.log("add 'desc: any' 'priority: int'");
                break;
            }
            var desc = parts[1];
            var priority = Number(parts[2]);
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
            var index = Number(parts[1]);
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
            var index = Number(parts[1]);
            if (isNaN(index)) {
                console.log("task number must be a number");
                break;
            }
            TM.editDescription(index - 1, parts[2]);
            break;
        }
        case "edits": {
            if (parts.length !== 3) {
                console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished'");
                break;
            }
            var index = Number(parts[1]);
            var new_status = status_map.get(parts[2]);
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
            var index = Number(parts[1]);
            var step = Number(parts[2]);
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
function input(prompt) {
    return new Promise(function (resolve) { return rl.question(prompt, resolve); });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TM.load();
                    TM.listTasks();
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, input("")];
                case 2:
                    command = _a.sent();
                    if (command === "exit") {
                        rl.close();
                        return [3 /*break*/, 3];
                    }
                    console.clear();
                    console.log('--');
                    cli(command);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
