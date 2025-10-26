import { DataTypes, Model, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import Institution from './Institution';

class Course extends Model {
  public id!: string;
  public institutionId!: string;
  public title!: string;
  public direction!: string;
  public description!: string;
  public images!: string[];
  public totalSpots!: number;
  public availableSpots!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public getInstitution!: BelongsToGetAssociationMixin<Institution>;
}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    institutionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'institutions',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    totalSpots: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    availableSpots: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'courses',
    timestamps: true,
  }
);

Course.belongsTo(Institution, { foreignKey: 'institutionId' });

export default Course;
