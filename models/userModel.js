const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let createdAt = `${yyyy}-${mm}-${dd}`;
    // const hashedPassword = await bcrypt.hash(this.password, 8);
    let sql = `INSERT INTO user(
        username,
        password,
        created_at
        )
        VALUES(
            '${this.username}',
            '${this.password}',
            '${createdAt}'
            );`;
    return db.query(sql);
  }
  static findAllUsers() {
    let sql = "SELECT * FROM user;";
    return db.query(sql);
  }
  static async findByUsername(username) {
    let sql = `SELECT * FROM user WHERE username='${username}';`;
    const user = await db.query(sql);
    console.log(user[0][0]);
    return user[0][0];
  }
  static findUserByIdAndDelete(id) {
    let sql = `DELETE FROM user WHERE id='${id}';`;
    return db.query(sql);
  }
}

module.exports = User;
