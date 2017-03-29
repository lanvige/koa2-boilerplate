import Sequelize, { Model } from 'sequelize';
import db from 'lib/database';

export default class Page extends Model {

  static init() {
    super.init({
      // attributes
      content: { type: Sequelize.TEXT, defaultValue: '', trim: true },
      slideId: { type: Sequelize.INTEGER, field: 'slide_id' },
      visible: { type: Sequelize.BOOLEAN, defaultValue: true },
      sequence: { type: Sequelize.INTEGER, defaultValue: 0, trim: true },
      // timestamp
      createdAt: { type: Sequelize.DATE, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' },
    }, {
      // configuration
      modelName: 'Page',
      sequelize: db,
      timestamps: true,
      paranoid: true,
      // updatedAt: false,
      // underscored: true,
      freezeTableName: true,
      tableName: 'pages',
    });
    return this;
  }
}
