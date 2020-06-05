/**
* 1.2 Function to create a Freshdesk ticket ! 🤘
* @param {String} title          Ticket title
* @param {String} description    Ticket description
* @param {String} email          email of the user that creates ticket
*/
function createFreshdeskTicket(title, description, email) {
  client.request.post("https://YOUR_SUB_DOMAIN.freshdesk.com/api/v2/tickets", {
    headers: {
      Authorization: "Basic <%= encode('YOUR_API_KEY:X')%>",
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({s
      description: `${description}`,
      email: `${email}`,
      priority: 1,
      status: 2,
      subject: `${title}`
    })
  })
    .then(function () {
      showNotification('success', 'Ticket is successfully created');
      //Clears user input after posting data
      clearInputfields();
    })
    .catch(function (error) {
      console.error(error);
      showNotification('danger', 'Unable to create ticket');
    });
}
