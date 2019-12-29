interface UserType {
  user: string;
}
// This is not a real datastore, but it can be if you make it one :)
interface Users {
  id: string;
  user: UserType;
}

interface Channel {
  name: string;
  id: string;
  user: string;
}

const messages = {};
let users: Users;
let me: string;
let defaultChannel: Channel;

const getMessages = () => {
  return messages;
};

// const addUser = (user: Users) => {
//   users[user.user] = user;
// };

// const getUser = (id: string) => {
//   return users[id];
// };

const setChannel = (channel: Channel) => {
  defaultChannel = channel;
};

const getChannel = () => {
  return defaultChannel;
};

const setMe = (id: string) => {
  me = id;
};

const getMe = () => {
  return me;
};
// addUser,getUser,
export { getMessages, getChannel, getMe, setChannel, setMe };
