const readline = require("readline");
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const status_map = new Map();
status_map.set("cancelled", -1);
status_map.set("pending", 0);
status_map.set("inProgress", 1);
status_map.set("finished", 2);

status_map.set(-1,"cancelled");
status_map.set(0, "pending");
status_map.set(1, "inProgress");
status_map.set(2, "finished");


class TaskManager{
    constructor(){
        this.tasks = [];
    }
    
    get task_counter(){
        return this.tasks.length;
    }

    addTask(Task) {
        console.log(Task);
        this.tasks.push(Task);
    }

    deleteTask(index){
        this.tasks.splice(index,1);
    }

    editDescription(index,new_description){
        this.tasks[index].description = new_description;
    }
    
    editStatus(index,new_status){
        this.tasks[index].status = new_status;
    }

    promoteTask(index,step){
        this.tasks[index].priority+= step;
    }

    listTasks(){
        for(var i = 0; i<this.tasks.length; i++){
            console.log((i+1) +" "+ this.tasks[i].description +" "+ status_map.get(this.tasks[i].status) +" "+ this.tasks[i].priority);
        }
    }

    load(){
        this.tasks = JSON.parse(fs.readFileSync('save.json').length == 0 ? '{"tasks":[]}' : fs.readFileSync('save.json')).tasks;
    }
    save(){
        fs.writeFileSync('save.json',JSON.stringify(TM));
    }
}

class Task{
    constructor(description,priority){
        this.description = description;
        this.status = 0;
        this.priority = priority == null ? 0 : parseInt(priority);
    }
}

const TM = new TaskManager();

function cli(command){
    command = command.split(" ");

    switch(command[0]){
        case "add":
            if (command.length!=3){
                console.log("add 'desc: any' 'priority: int' ");
                console.log("Too many or few parameters");
                break;
            }
            var desc = command[1];
            var priority = command[2];
            if (isNaN(priority)){
                console.log("add 'desc: any' 'priority: int' ");
                console.log("priority must be a number");
                break;
            }
            const task = new Task(desc,priority);
            TM.addTask(task);
            break;
        
        case "delete":
            if (command.length!=2){
                console.log("delete 'task number: int'");
                console.log("Too few or many parameters");
                break;
            }
            var index = command[1];
            if (isNan(index)){
                console.log("delete 'task number: int'");
                console.log("task number must be a number");
                break;
            }
            TM.deleteTask(index-1);
            break;
        
        case "editd":
            if (command.length!=3){
                console.log("editd 'task number: int' 'new desc: any'");
                console.log("Too many or few parameters");
                break;
            }
            var index = command[1];
            var new_description = command[2];
            if (isNan(index)){
                console.log("editd 'task number: int' 'new desc: any'");
                console.log("task number must be a number");
                break;
            }

            TM.editDescription(index-1,new_description);
            break;
        
        case "edits":
            if (command.length!=3){
                console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished' ");
                console.log("Too many or few parameters");
                break;
            }
            var index = command[1];
            var new_status = command[2];

            if (isNan(index)){
                console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished' ");
                console.log("task number must be a number");
                break;
            }

            TM.editStatus(index-1,status_map.get(new_status));
            break;
        
        case "editp":
            if (command.length!=3){
                console.log("editp 'task number: int' 'priority offset: int' ");
                console.log("Too many or few parameters");
                break;
            }
            var index = command[1];
            var step = command[2];

            if (isNan(index)){
                console.log("editp 'task number: int' 'priority offset: int' ");
                console.log("task number must be a number");
                break;
            }

            TM.promoteTask(index-1,parseInt(step));
            break;

        case "help":
            console.log("add 'desc: any' 'priority: int' ");
            console.log("delete 'task number: int'");
            console.log("editd 'task number: int' 'new desc: any'");
            console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished' ");
            console.log("editp 'task number: int' 'priority offset: int' ");
            break;

        default:
            console.log("add 'desc: any' 'priority: int' ");
            console.log("delete 'task number: int'");
            console.log("editd 'task number: int' 'new desc: any'");
            console.log("edits 'task number: int' 'new status: cancelled/pending/inProgress/finished' ");
            console.log("editp 'task number: int' 'priority offset: int' ");
            break;
    }
    TM.listTasks();
    TM.save();
}

function input(promt){
    return new Promise(resolve => rl.question(promt, resolve));
}

async function main(){
    TM.load();
    TM.listTasks();
    while (true) {
        const command = await input("");

        if (command === "exit") {
        rl.close();
        break;
        }
        console.clear();
        cli(command);
    }
}

main();
