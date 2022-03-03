const { Task } = require('./model');
const dbContext = require('./dbContext');

class Service {
    constructor () { 
        this.service = "Service";
        this.method = "";
    }

    async getTasks () {   
        this.method = "getTasks";
        try {
            var db = await dbContext.connect();
            let taskRepo = db.getRepository(Task);

            const result = await taskRepo.find();
            let serviceResult  = { status:"success", message: "Tasks retrieved.",service: this.service, method: this.method, data: result };
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        }
    }

    async getTask (id) {
        this.method = "getTask";
        try {
            var db = await dbContext.connect();
            let taskRepo = db.getRepository(Task);

            const result = await taskRepo.findOne({ id: Number(id) })
            let serviceResult  = { status:"success", message: "Task retrieved.",service: this.service, method: this.method, data: result };
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        }
    }

    async addTask (task) {
        this.method = "addTask";
        try {
            var db = await dbContext.connect();
            let taskRepo = db.getRepository(Task);

            let taskToAdd = new Task();
            taskToAdd.name = task.name;
            taskToAdd.description = task.description;
            taskToAdd.priority = task.priority;
            taskToAdd.status = task.status;  
            const result = await taskRepo.save(taskToAdd);

            let serviceResult  = { status:"success", message: "Tasks added.",service: this.service, method: this.method, data: result };
            await db.close();
            console.error(serviceResult);
            return serviceResult;
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        }  
    }

    async updateTask (task) {
        this.method = "updateTask";
        try {
            var db = await dbContext.connect();
            let taskRepo = db.getRepository(Task);

            let taskToUpdate = new Task(Number(task.id));
            taskToUpdate.name = task.name;
            taskToUpdate.description = task.description;
            taskToUpdate.priority = task.priority;
            taskToUpdate.status = task.status;
            const result = await taskRepo.save(taskToUpdate);

            let serviceResult  = { status:"success", message: "Tasks updated.",service: this.service, method: this.method, data: result };
            await db.close();
            console.error(serviceResult);
            return serviceResult;
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        }  
    }
    
    async deleteTask (task) {
        this.method = "deleteTask";
        try {
            var db = await dbContext.connect();
            let taskRepo = db.getRepository(Task);

            let taskToRemove = new Task(Number(task.id));
            const result = await taskRepo.remove(taskToRemove);

            let serviceResult  = { status:"success", message: "Tasks deleted.",service: this.service, method: this.method, data: result };
            await db.close();
            console.error(serviceResult);
            return serviceResult;
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            await db.close();
            return serviceResult;
        }  
    }
}

module.exports = Service;
