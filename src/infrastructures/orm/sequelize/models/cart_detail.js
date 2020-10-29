/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_detail', {
    id_cart_detail: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_cart: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id_cart'
      }
    },
    id_ticket: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'id_ticket'
      }
    },
    order_qty: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    order_amount: {
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
    tableName: 'cart_detail',
    timestamps: false,
  });
};
