const getChannelList = "select channel_id,name from channel";
const getChannelInfo = (id) => {
  return `select * from channel where channel_id=${id}`;
};
const createChannel = (name) => {
  return `insert into channel (name) values ("${name}")`;
};
const createPost = () => {
  return `insert into channel_post (channel_id, user_id, content, create_time) values (1, 1, "안녕", now())`;
};
const getUserList = (id) => {
  return `select * from user join user_channel on user.user_id = user_channel.user_id join channel on channel.channel_id = user_channel.channel_id where channel.name="${id}"`;
};
const addUser = (user_id, id) => {
  return `insert into user_channel (user_id,channel_id) values (${user_id}, ${id}) `;
};
module.exports = {
  getChannelList,
  getChannelInfo,
  createChannel,
  getUserList,
  addUser,
};
