/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const order = sequelize.define('order', {
    id_order: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    id_transaction: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    id_ticket: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    order_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_qty: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    tableName: 'order',
    timestamps: false
  });
  order.associate = function (models) {
    order.hasOne(models.ticket, {
      foreignKey: 'id_ticket',
      sourceKey: "id_ticket",
    })
  }
  return order
};
