// db.js
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/turnos.db"
});

export default sequelize;
