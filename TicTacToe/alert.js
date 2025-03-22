// Function to dynamically load the alert box from alert.html
function loadAlert() {
    fetch('./alert.html') // Fetch the alert.html file
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load alert.html');
            }
            return response.text(); // Return the HTML content as text
        })
        .then((html) => {
            // Inject the alert HTML into the body
            const alertContainer = document.createElement('div');
            alertContainer.innerHTML = html;
            document.body.appendChild(alertContainer);

            // Add event listener to the OK button
            const alertOkButton = document.getElementById('alert-ok');
            if (alertOkButton) {
                alertOkButton.addEventListener('click', hideAlert);
            }
        })
        .catch((error) => {
            console.error('Error loading alert:', error);
        });
}

// Function to show the custom alert
function showAlert(message, callback) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    if (alertBox && alertMessage) {
        // Set the message
        alertMessage.textContent = message;

        // Show the alert box
        alertBox.classList.remove("hidden");

        // Add a one-time event listener to the OK button
        const alertOkButton = document.getElementById("alert-ok");
        if (alertOkButton) {
            const handleOkClick = () => {
                alertBox.classList.add("hidden"); // Hide the alert box
                alertOkButton.removeEventListener("click", handleOkClick); // Remove the event listener
                if (callback) callback(); // Execute the callback if provided
            };
            alertOkButton.addEventListener("click", handleOkClick);
        }
    }
}

// Function to hide the custom alert
function hideAlert() {
    const alertBox = document.getElementById("custom-alert");
    if (alertBox) {
        alertBox.classList.add("hidden");
    }
}

// Ensure the alert box is loaded when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadAlert(); // Dynamically load the alert box
});