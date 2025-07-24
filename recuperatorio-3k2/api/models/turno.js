import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
// import del modelo Centro
import Centro from "./centro.js";

class Turno extends Model {}

Turno.init({
    idTurno: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true
    },
    profesional: {
        type: DataTypes.TEXT,
        field: "profesional"
    },
    especialidad: {
        type: DataTypes.TEXT,
        field: "especialidad"
    },
    fecha: {
        type: DataTypes.DATEONLY,
        field: "fecha"
    },
    hora: {
        type: DataTypes.TEXT,
        field: "hora"
    },
    consultorio: {
        type: DataTypes.TEXT,
        field: "consultorio"
    },
    estado: {
        type: DataTypes.TEXT,
        field: "estado"
    },
    idCentro: {
        type: DataTypes.INTEGER,
        field: "idCentro"
    }
},{
    sequelize,
    modelName: "Turno",
    tableName: "Turno",
    timestamps: false
});

Turno.belongsTo(Centro, {
    foreignKey: {
        name: "idCentro",
        field: "idCentro"
    },
    as: "centro"
});

Centro.hasMany(Turno, {
    foreignKey: {
        name: "idCentro",
        field: "idCentro"
    },
    as: "turno"
});

export default Turno;