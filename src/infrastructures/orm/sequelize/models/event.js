/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const event= sequelize.define('event', {
    id_event: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    id_location: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
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
    tableName: 'event',
    timestamps: false
  });
  event.associate = function (models) {
    event.hasOne(models.location, {
      foreignKey: 'id_location',
      sourceKey: 'id_location',

    });
    event.hasMany(models.ticket, {
      foreignKey: 'id_event',
      sourceKey: 'id_event',
    });
  };
  return event
};
