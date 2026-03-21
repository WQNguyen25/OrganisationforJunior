
document.getElementById("timeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // stop page reload

    const selectedTimes = [];

    document.querySelectorAll('input[name="time"]:checked').forEach((checkbox) => {
        selectedTimes.push(checkbox.value);
    });

    console.log("Selected times:", selectedTimes);
    

        // Display values
    const outputDiv = document.getElementById("output");

    if (selectedTimes.length > 0) {
        outputDiv.innerHTML = "You selected: " + selectedTimes.join(", ") + "am";
    } else {
        outputDiv.innerHTML = "No time selected";
    }
});

