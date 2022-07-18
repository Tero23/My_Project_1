const db = require("../config/db");

class Todo {
  constructor(task, completed, user_id) {
    this.task = task;
    this.completed = completed;
    this.user_id = user_id;
  }
  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let createdAt = `${yyyy}-${mm}-${dd}`;
    let sql = `INSERT INTO todo(
        task,
        completed,
        created_at,            
        user_id
    ) 
    VALUES(
        '${this.task}',
        '${this.completed}',
        '${createdAt}',
        '${this.user_id}'
    );`;
    return db.query(sql);
  }

  static findAllTodos() {
    let sql = `SELECT * FROM todo;`;
    return db.execute(sql);
  }

  static findMyTodos(id) {
    let sql = `SELECT * FROM todo WHERE user_id='${id}';`;
    return db.execute(sql);
  }

  static findTodoByIdAndDelete(id) {
    let sql = `DELETE FROM todo WHERE id='${id}';`;
    return db.execute(sql);
  }
  static findUserIdByTodoId(id) {
    let sql = `SELECT user_id FROM todo WHERE id='${id}';`;
    return db.execute(sql);
  }
  static findAllMyTodosAndDelete(id) {
    let sql = `DELETE FROM todo WHERE user_id='${id}';`;
    return db.execute(sql);
  }
}

module.exports = Todo;
