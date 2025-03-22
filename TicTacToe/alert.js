// Function to show the custom alert
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

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const alertOkButton = document.getElementById("alert-ok");
    if (alertOkButton) {
        alertOkButton.addEventListener("click", hideAlert);
    }
});