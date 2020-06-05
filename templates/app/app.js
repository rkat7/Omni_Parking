$(document).ready(function () {
	app.initialized()
		.then(function (_client) {
			window.client = _client;
			client.events.on('app.activated', function () {
				onLoadClickEventHandler();
			});
		})
		.catch(function (error) {
			console.error(error);
			showNotification('danger', 'Sorry! Unable to load app');
		});
});

/**
 *   Register click event handler for `Create Ticket` button
 */
function onLoadClickEventHandler() {
	$('#createTicket').click(function () {
		var title = $('#title').val();				// Ticket title fetched from user Input
		var desc = $('#desc').val();					// Description of the ticket fetched from user input
		var email = $('#email').val();				// Email id of the user, creating the ticket
		if (title && desc && email) {
			//createFreshdeskTicket(title, desc, email);
		} else {
			showNotification('danger', 'Ticket Values cannot empty, Fill all values');
		}
	});
}

// 1.2 Paste the code for createFreshdeskTicket() here 👇🏼 !
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


/**
 * Function to show notifications to the user
 * @param {String} status   	Status of the notification
 * @param {String} message  	Custom notification message 
 */
function showNotification(status, message) {
	client.interface.trigger("showNotify", {
		type: `${status}`,
		message: `${message}`
	});
}

/**
 * Clear the input fields
 */
function clearInputfields() {
	$('#title').val('');
	$('#desc').val('');
	$('#email').val('');
}

