import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const user = sequelize.define(
	"User",
	{
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "user",
	},
);

export default user;
