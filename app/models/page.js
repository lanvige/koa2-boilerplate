import Sequelize from 'sequelize';
import db from 'lib/database';

const Page = db.define('Page', {
  content: { type: Sequelize.TEXT, defaultValue: '', trim: true },
  slideId: { type: Sequelize.INTEGER, field: 'slide_id' },
  visible: { type: Sequelize.BOOLEAN, defaultValue: true },
  sequence: { type: Sequelize.INTEGER, defaultValue: 0, trim: true },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' }
}, {
  tableName: 'pages',
  defaultScope: {
    where: {
      visible: true
    }
  }
});


export default Page;
