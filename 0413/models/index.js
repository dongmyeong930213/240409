'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname+"/../config/config.json")["development"]
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
//만들어진 모델을 불러오기
const PlayerModel = require("./Player")(sequelize,Sequelize);
const ProfileModel = require("./Profile")(sequelize,Sequelize);
const TeamModel = require("./Team")(sequelize,Sequelize);
const TeamGameModel = require("./TeamGame")(sequelize,Sequelize);
const GameModel = require("./Game")(sequelize,Sequelize);


//모델간의 관계설정 1:1
PlayerModel.hasOne(ProfileModel,{
  // 두 모델을 연결하는 키와 관련해서 설정
  onDelete : "CASCADE",
  onUpdate : "CASCADE",
  foreignKey : "Player_id"
})

ProfileModel.belongsTo(PlayerModel,{
  foreignKey : "Player_id"
})

// 1:다
TeamModel.hasMany(PlayerModel,{
  foreignKey : "teamid",
  sourceKey : "team_id",
})

PlayerModel.hasMany(TeamModel,{
  foreignKey : "teamid",
  targetKey : "team_id",
})


// n:m
TeamModel.belongsToMany(GameModel,{
  through : TeamGameModel,
  foreignKey : "team_id"
})

GameModel.belongsToMany(TeamModel,{
  through : TeamGameModel,
  foreignKey : "game_id"
})



db.Player = PlayerModel;
db.Profile = ProfileModel;
db.Team = TeamModel;
db.TeamGame = TeamGameModel;
db.Game = GameModel;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;