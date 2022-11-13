// This class updates data to the HTML page

class ChatUI {

  constructor(ul) {
    this.ul = ul
  }

  renderUI(data) {
    data.forEach(element => {
      let createdTime = dateFns.distanceInWordsToNow(
        element.created_at.toDate(),
        { addSuffix: true }
      );

      const html = `
    <li class="list-group-item">
      <span class="username">${element.username} : </span>
      <span class="message">${element.message}</span>
      <div class="time">${createdTime}</span>
    </li>
    `
      this.ul.innerHTML += html;
    });

  }

  cleartheChat() {
    this.ul.innerHTML = '';
  }



}