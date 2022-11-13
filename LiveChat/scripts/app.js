const newMsg = document.querySelector('.new-chat');
const ul = document.querySelector('.chat-list');
const roomList = document.querySelector('.chat-rooms');
const updateName =  document.querySelector('.new-name');


let selectedRoom = 'general';
let generalRecords = [];
let gameRecords = [];
let musicRecords = [];
let ninjaRecords = [];

//change the room
roomList.addEventListener('click', (event) => {
 let groups =  Array.from(roomList.getElementsByClassName('group-tab'));
 groups.forEach((element)=>
 {
    element.classList.remove('active');
 })
  if (event.target.classList.contains('btn')) {
    selectedRoom = event.target.getAttribute('id');
    event.target.classList.add('active');
   
    switch (selectedRoom) {
      case 'general':
        chatRoom.setRoom('general');
        chatUI.cleartheChat();
        chatUI.renderUI(generalRecords);
        break;

      case 'gaming':
        chatRoom.setRoom('gaming');
        chatUI.cleartheChat();
        chatUI.renderUI(gameRecords);
        break;

      case 'music':
        chatRoom.setRoom('music');
        chatUI.cleartheChat();
        chatUI.renderUI(musicRecords);
        break;

      case 'ninjas':
        chatRoom.setRoom('ninjas');
        chatUI.cleartheChat();
        chatUI.renderUI(ninjaRecords);
        break;

      default:
        break;
    }
  }
})

// Add a new message
newMsg.addEventListener('submit', (event) => {
  event.preventDefault();
  if(newMsg.message.value.trim().length > 0)
  {
    chatRoom.addMessage(newMsg.message.value.trim()).then(() => {
      newMsg.reset();
    }).catch((err) => console.error("something went wrong : ", err));
  
  }

})

//update the name
updateName.addEventListener('submit', (event)=>
{
  event.preventDefault();
  if(updateName.name.value.trim().length > 0)
  {
    chatRoom.setUserName(updateName.name.value.trim());
    console.log(chatRoom);
    updateName.reset();
  }
})

// general subscription
const generalRoom = db.collection("chats")
  .where('room', '==', 'general')
  .orderBy('created_at')
  .onSnapshot((snapshot) => {
    generalRecords = [];

    snapshot.docs.forEach((change) => {
      generalRecords.push(change.data());
    })

    if (selectedRoom == 'general') {
      chatUI.cleartheChat();
      chatUI.renderUI(generalRecords);
    }


  })


// gaming subscription
const gameRoom = db.collection("chats")
  .where('room', '==', 'gaming')
  .orderBy('created_at')
  .onSnapshot((snapshot) => {
    gameRecords = [];

    snapshot.docs.forEach((change) => {
      gameRecords.push(change.data());
    })

    if (selectedRoom == 'gaming') {
      chatUI.cleartheChat();
      chatUI.renderUI(gameRecords);
    }
  })


// music subscription
const musicRoom = db.collection("chats")
  .where('room', '==', 'music')
  .orderBy('created_at')
  .onSnapshot((snapshot) => {
    musicRecords = [];
    snapshot.docs.forEach((change) => {
      musicRecords.push(change.data());
    })

    if (selectedRoom == 'music') {
      chatUI.cleartheChat();
      chatUI.renderUI(musicRecords);
    }
  })


// ninja subscription
const ninjaRoom = db.collection("chats")
  .where('room', '==', 'ninjas')
  .orderBy('created_at')
  .onSnapshot((snapshot) => {
    ninjaRecords = [];
    snapshot.docs.forEach((change) => {
      ninjaRecords.push(change.data());
    })

    
    if (selectedRoom == 'ninjas') {
      chatUI.cleartheChat();
      chatUI.renderUI(ninjaRecords);
    }
  })


const chatRoom = new Chatroom('Unknown', 'general');
const chatUI = new ChatUI(ul);

const audio =  document.querySelector(".audio");
const play =  document.querySelector('.play');

play.addEventListener('click',event =>
{
  console.log("event clicked");
  audio.play();
})
