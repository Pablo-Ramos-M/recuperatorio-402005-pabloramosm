import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Centro extends Model {}

Centro.init({
    idCentro: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        field: "nombre"
    },
    direccion: {
        type: DataTypes.TEXT,
        field: "direccion"
    }
},{
    sequelize,
    modelName: "Centro",
    tableName: "Centro",
    timestamps: false
});

export default Centro;