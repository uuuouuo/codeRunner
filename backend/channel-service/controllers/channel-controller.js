const db = require("../db/connection");
const query = require("../db/channel-query");

module.exports.getChannelList = async (req, res) => {
  db.query(query.getChannelList, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};
module.exports.getChannelInfo = async (req, res) => {
  const id = req.params.id;
  db.query(query.getChannelInfo(id), (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};
module.exports.createChannel = async (req, res) => {
  const { name } = req.body;
  db.query(query.createChannel(name), (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};
module.exports.createPost = async (req, res) => {
  db.query(`insert into channel_post (channel_id, user_id, content, create_time) values (1, 1, "안녕", now())`, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};
module.exports.getUserList = async (req, res) => {
  const id = req.params.id;
  db.query(query.getUserList(id), (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};

module.exports.addUser = async (req, res) => {
  const { user_id } = req.body;
  const id = req.params.id;
  db.query(query.addUser(user_id, id), (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
};
