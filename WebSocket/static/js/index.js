const DATA = { client: null };

//we dont need line 4 and 5 because we are going to automatically connect when we go to site with use effect
document.getElementsByClassName("connect")[0].addEventListener("click", () => {
  if (DATA.client === null) {
    // Change string to "http://sprpurplesquirrel.com/chat" for testing.
    DATA.client = Stomp.over(new SockJS("http://localhost:8080/chat"));
    DATA.client.connect({}, frame => {
      DATA.client.subscribe("/topic/messages", message => {
        //this is where logic will be 
        createSection(message)
      });
    });
  };
});

//we shouldnt need this because we dont need to disconnect
document.getElementsByClassName("disconnect")[0].addEventListener("click", () => {
  if (DATA.client != null) {
    DATA.client.disconnect();
    DATA.client = null
  };
});

document.getElementsByClassName("send")[0].addEventListener("click", () => {
  DATA.client.send("/app/chat/" + "Mike", {}, JSON.stringify({
      from: "Mike",
      text: document.getElementsByTagName("input")[0].value
    }));
});

//we will not need this function because we will just push a compnent to the array
const createSection = message => {
  const section = document.createElement("section");
  section.innerHTML = JSON.parse(message.body).message;
  document.getElementsByTagName("main")[0].appendChild(section);
};
