/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const transaction = sequelize.define('transaction', {
    id_transaction: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    id_customer: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    invoice_amount: {
      type: DataTypes.INTEGER(20),
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
    tableName: 'transaction',
    timestamps: false
  });
  transaction.associate = function (models) {
    transaction.hasMany(models.order, {
      foreignKey: 'id_transaction'
    })
  }
  return transaction
};
