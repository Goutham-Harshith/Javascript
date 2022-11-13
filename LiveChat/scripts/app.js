const newMsg = document.querySelector('.new-chat');
const ul = document.querySelector('.chat-list');
const roomList = document.querySelector('.chat-rooms');
const updateName = document.querySelector('.new-name');
const audio = document.querySelector(".audio");
const play = document.querySelector('.play');

let selectedRoom = 'general';
let generalRecords = [];
let gameRecords = [];
let musicRecords = [];
let ninjaRecords = [];
let generalChatCount = 0;
let gamingChatCount = 0;
let musicChatCount = 0;
let ninjaChatCount = 0;

//change the room
roomList.addEventListener('click', (event) => {
  let groups = Array.from(roomList.getElementsByClassName('group-tab'));
  groups.forEach((element) => {
    element.classList.remove('active');
  })
  if (event.target.classList.contains('btn')) {
    selectedElement = event.target;
    selectedRoom = event.target.getAttribute('id');
    event.target.classList.add('active');
    selectedElement.innerHTML = `#${selectedRoom}`
    switch (selectedRoom) {
      case 'general':
        chatRoom.setRoom('general');
        chatUI.cleartheChat();
        chatUI.renderUI(generalRecords);
        generalChatCount = 0;
        ul.scrollTop = ul.scrollHeight;
        break;

      case 'gaming':
        chatRoom.setRoom('gaming');
        chatUI.cleartheChat();
        chatUI.renderUI(gameRecords);
        gamingChatCount = 0;
        ul.scrollTop = ul.scrollHeight;
        break;

      case 'music':
        chatRoom.setRoom('music');
        chatUI.cleartheChat();
        chatUI.renderUI(musicRecords);
        musicChatCount = 0;
        ul.scrollTop = ul.scrollHeight;
        break;

      case 'ninjas':
        chatRoom.setRoom('ninjas');
        chatUI.cleartheChat();
        chatUI.renderUI(ninjaRecords);
        ninjaChatCount = 0;
        ul.scrollTop = ul.scrollHeight;
        break;

      default:
        break;
    }
  }
})

// Add a new message
newMsg.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (newMsg.message.value.trim().length > 0) {
    chatRoom.addMessage(newMsg.message.value.trim()).then(() => {
    }).catch((err) => console.error("something went wrong : ", err));
    newMsg.reset();
  }

})

//update the name
updateName.addEventListener('submit', (event) => {
  event.preventDefault();
  if (updateName.name.value.trim().length > 0) {
    chatRoom.setUserName(updateName.name.value.trim());
    localStorage.setItem('userName', updateName.name.value.trim())
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
      ul.scrollTop = ul.scrollHeight;
    }
    else {
      generalChatCount += 1;
      if (generalChatCount > 1) {
        let showMessageNotification = document.getElementById('general');
        showMessageNotification.innerHTML = `#general <span class="badge"> +${generalChatCount - 1} </span> `
        showMessageToaster('#general');
        // message alert below
        let promise = audio.play();
        if (promise !== undefined) {
          promise.then(_ => {

          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      }

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
      ul.scrollTop = ul.scrollHeight;
    }
    else {
      gamingChatCount += 1;
      if (gamingChatCount > 1) {
        let showMessageNotification = document.getElementById('gaming');
        showMessageNotification.innerHTML = `#gaming <span class="badge"> +${gamingChatCount - 1} </span> `;
        showMessageToaster('#gaming');
        // message alert below
        let promise = audio.play();
        if (promise !== undefined) {
          promise.then(_ => {

          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      }

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
      ul.scrollTop = ul.scrollHeight;
    } else {
      musicChatCount += 1;
      if (musicChatCount > 1) {
        let showMessageNotification = document.getElementById('music');
        showMessageNotification.innerHTML = `#music <span class="badge"> +${musicChatCount - 1} </span> `
        showMessageToaster('#music');
        // message alert below
        let promise = audio.play();
        if (promise !== undefined) {
          promise.then(_ => {

          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      }

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
      ul.scrollTop = ul.scrollHeight;
    }
    else {
      ninjaChatCount += 1;
      if (ninjaChatCount > 1) {
        let showMessageNotification = document.getElementById('ninjas');
        showMessageNotification.innerHTML = `#ninjas <span class="badge"> +${ninjaChatCount - 1} </span> `;
        showMessageToaster('#ninjas');
        // message alert below
        let promise = audio.play();
        if (promise !== undefined) {
          promise.then(_ => {

          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
      }

    }

  })

const showMessageToaster = (channelName) => {
  let toast = document.querySelector(".toast");
  let subTitle = document.querySelector('.toast-body');
  toast.classList.remove('d-none');
  $('.toast').toast('show');
  subTitle.innerHTML = `check ${channelName} channel to see it.`
}

let userName = localStorage.getItem('userName');
if(!userName)
{
  userName = 'Unknown';
}

const chatRoom = new Chatroom(userName, 'general');
const chatUI = new ChatUI(ul);




