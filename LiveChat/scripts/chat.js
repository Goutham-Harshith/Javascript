// This class handles the data for different chat groups
class Chatroom {

  constructor(username, room) {
    this.username = username;
    this.room = room
  }

  // Add a new chat to the db
  async addMessage(message) {

    const now = new Date();
    const obj = {
      message: message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now) // This is how we create a new timestamp using firebase
    }

    let response = await db.collection('chats').add(obj)
    return response;
  }

  setUserName(userName)
  {
    this.username = userName;
  }

  setRoom(roomName){
    this.room = roomName;
  }

}