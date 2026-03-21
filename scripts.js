
// Display stored times on page load
window.addEventListener('DOMContentLoaded', function() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    days.forEach(day => {
        // Display stored times for each day
        const storedTimes = JSON.parse(localStorage.getItem('selectedTimes' + day) || '[]');
        displayTimes(storedTimes, 'output' + day);

        // Add event listener for each form
        document.getElementById("timeForm" + day).addEventListener("submit", function(event) {
            event.preventDefault(); // stop page reload

            const selectedTimes = [];
            this.querySelectorAll('input[name="time[]"]:checked').forEach((checkbox) => {
                selectedTimes.push(checkbox.value);
            });

            console.log("Selected times for " + day + ":", selectedTimes);
            
            // Store the selected times in localStorage
            localStorage.setItem('selectedTimes' + day, JSON.stringify(selectedTimes));

            // Display values
            displayTimes(selectedTimes, 'output' + day);
        });
    });
});

function displayTimes(times, outputId) {
    const outputDiv = document.getElementById(outputId);

    if (times.length > 0) {
        outputDiv.innerHTML = "Selected times: " + times.join(", ");
    } else {
        outputDiv.innerHTML = "No time selected";
    }
}

