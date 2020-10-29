/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_transaction: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'transaction',
        key: 'id_transaction'
      }
    },
    id_ticket: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ticket',
        key: 'id_ticket'
      }
    },
    pay_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'order',
    timestamps: false,
  });
};
