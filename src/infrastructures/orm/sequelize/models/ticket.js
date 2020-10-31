/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ticket = sequelize.define('ticket', {
    id_ticket: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    id_event: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'ticket',
    timestamps: false
  });
  ticket.associate = function (models) {
    ticket.hasOne(models.event, {
      foreignKey: 'id_event',
      sourceKey: "id_event",
    })
  }
  return ticket
};
