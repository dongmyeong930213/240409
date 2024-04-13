Cmain.js
_____________________________
const { Op } = require("sequelize");
const { Player, Profile, Team, Game, TeamGame } = require("../models");
// 첫화면
exports.main = (req, res) => {
  res.render("index");
};
// 모든 선수들 보기
exports.getAllPlayer = async (req, res) => {
  try {
    const players = await Player.findAll();
    console.log(players);
    res.json(players);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
// 특정선수 조회 /players/:playerId
exports.getPlayer = async (req,res)=>{
  try{
    console.log(req.params);
    const { playerId } = req.params;
    const player = await Player.findOne({
      where: { player_id: playerId },
      include :[{ model: Profile, attributes :["position", "salary"]}]
    })
    res.json(player)
  }catch(err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
}
// POST /players -선수추가
exports.postPlayer = async (req, res) => {
  try{
    console.log(req.body);
    const { name, age, teamId } = req.body;
    const newPlayer = await Player.create({
      name,
      age,
      team_id: teamId,
    });
    console.log(newPlayer);
    res.send(newPlayer)
  } catch(err){
    console.log("err", err);
    res.status(500).send("server err");
  }
}
// Patch /players/:playId/team
exports.patchPlayer = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { team_id } = req.body;
    const { playerId } = req.params;
    const updatedPlayer = await Player.update(
      {
        teamid: team_id,
      },
      {
        where: { player_id: playerId },
      }
    );
    console.log(updatedPlayer);
    console.log(updatedPlayer[0]);
    res.json(updatedPlayer);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
// delete /players/:playerId
exports.deletePlayer = async (req, res) => {
  try {
    console.log(req.params.playerId);
    const { playerId } = req.params;
    const isDeleted = await Player.destroy({
      where: {
        player_id: playerId,
        // 컬럼명: 조건
      },
    });
    console.log(isDeleted);
    if (isDeleted) res.send("삭제 완료");
    else return res.send(false);
    //
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
// GET /teams
// 쿼리를 이용해서 팀정렬 혹은 검색
exports.getTeams = async (req, res) => {
  try {
    console.log(req.query);
    // {search: ~ } or {sort: ~ }
    const { sort, search } = req.query;
    let teams;
    if (sort === "name_asc") {
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
        order: [["name", "ASC"]], // ORDER BY name ASC
      });
    } else if (search) {
      // search query 가 들어왔다면
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
        where: {
          name: { [Op.like]: `%${search}%` },
        },
      });
    } else {
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
      });
    }
    if (teams.length === 0) res.send("다시 검색해보세요. 정보가 없습니다.");
    else res.send(teams);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
// 특정 팀 조회(params)
// GET /teams/:teamId (teams/3)
exports.getTeam = async (req, res) => {
  try {
    console.log("~~여기입니다면만");
    console.log(req.params); // teamId:~
    const { teamId } = req.params;
    const team = await Team.findOne({
      where: { team_id: teamId },
    });
    res.json(team);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
// 특정 팀의 모든 "선수" 조회
// GET /teams/:teamId/players
exports.getTeamPlayers = async (req, res) => {
  try {
    const teamPlayers = await Team.findOne({
      where: { team_id: teamId },
      include: [{ model: Player }],
    });
    res.send(teamPlayers);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};
exports.getAllGame = async (req, res) => {
  try {
    console.log(Team);
    console.log(Game);
    console.log(TeamGame);
    const allGame = await Team.findAll({
      include: [{ model: Game }],
    });
    console.log(allGame);
    res.send(allGame);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server err");
  }
};