/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction', {
    id_transaction: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'id_ticket'
      }
    },
    id_customer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id_customer'
      }
    },
    invoice_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    invoice_amount: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    }
  }, {
    tableName: 'transaction',
    timestamps: false,
  });
};
