const EntitySchema = require("typeorm").EntitySchema;

class Task {
    constructor(id, name) {
      this.id = id;
      this.name = name;
  }
}

const TaskSchema = new EntitySchema({
  name: "Task",
  target: Task,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    description: {
      type: "varchar"
    },
    priority: {
      type: "varchar"
    },
    status: {
      type: "varchar"
    }
  }
});

module.exports = { TaskSchema, Task} ;