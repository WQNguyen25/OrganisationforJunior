// Display stored times on page load
window.addEventListener('DOMContentLoaded', function() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const People = [
        { name: 'Samuel Parks', times: ['9.00', '10.00', '14.00'] },
        { name: 'Ryan Thompson', times: ['10.00', '11.00', '12.00'] },
        { name: 'Francis Drake', times: ['12.00', '13.00', '14.00'] },
        { name: 'Emily Johnson', times: ['9.00', '11.00', '15.00'] },
        { name: 'Michael Smith', times: ['10.00', '12.00', '16.00'] },
        { name: 'Jessica Lee', times: ['9.00', '13.00', '14.00'] }, 
        { name :'Mustafa Kemal', times: ['12.00','13.00']},
        { name: 'Ben Dover', times: ['11.00', '14.00', '15.00'] },
        { name: 'Temujin Borjigin', times: ['9.00', '10.00', '11.00'] },
        
        

    ];
    //method to get user times for a specific day from localStorage
    function getUserTimesForDay(day) {
        return JSON.parse(localStorage.getItem('selectedTimes' + day) || '[]');
    }

    // Updated updateMatches to include a button
function updateMatches() {
    const matchResultsElement = document.getElementById('matchResults');
    if (!matchResultsElement) return;

    const friends = JSON.parse(localStorage.getItem('friendsList') || '[]');
    let hasSelection = false;

    const sections = days.map(day => {
        const userTimes = getUserTimesForDay(day);
        if (userTimes.length === 0) return `<div><strong>${day}:</strong> No times selected.</div>`;

        hasSelection = true;
        const matchedPeople = People.map(person => {
            const shared = person.times.filter(time => userTimes.includes(time));
            if (shared.length === 0) return null;

            const isFriend = friends.includes(person.name);

            return `
                <div style="margin-bottom: 8px; padding:12px; border-left: 3px solid #0d6efd; background:#fff; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${person.name}</strong><br>
                        <small>Available: ${person.times.join(', ')}</small><br>
                        <strong>Matching: ${shared.join(', ')}</strong>
                    </div>
                    <button 
                        onclick="addFriend('${person.name}')" 
                        class="btn ${isFriend ? 'btn-success disabled' : 'btn-outline-primary'} btn-sm">
                        ${isFriend ? 'Friends ✓' : 'Add Friend'}
                    </button>
                </div>`;
        }).filter(Boolean);

        if (matchedPeople.length === 0) {
            return `<div><strong>${day}:</strong> No matches found.</div>`;
        }

        return `<div><h4 class="mt-3">${day}</h4>${matchedPeople.join('')}</div>`;
    });

    matchResultsElement.innerHTML = hasSelection ? sections.join('<hr>') : '<p>No times selected yet.</p>';
}
    function refreshDay(day) {
        const storedTimes = JSON.parse(localStorage.getItem('selectedTimes' + day) || '[]');
        displayTimes(storedTimes, 'output' + day);
    }

    days.forEach(day => {
        refreshDay(day);

        const form = document.getElementById('timeForm' + day);
        if (!form) return;

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // stop page reload

            const selectedTimes = [];
            this.querySelectorAll('input[name="time[]"]:checked').forEach((checkbox) => {
                selectedTimes.push(checkbox.value);
            });

            console.log('Selected times for ' + day + ':', selectedTimes);

            localStorage.setItem('selectedTimes' + day, JSON.stringify(selectedTimes));
            displayTimes(selectedTimes, 'output' + day);
            // Removed updateMatches() call here since matches are now on separate page
        });
    });

    // Handle general submit button
    const generalSubmit = document.getElementById('generalSubmit');
    if (generalSubmit) {
        generalSubmit.addEventListener('click', function() {
            window.location.href = 'matches.html';
        });
    }

    // If on matches page, display matches
    if (document.getElementById('matchResults')) {
        updateMatches();
    }
});

function displayTimes(times, outputId) {
    const outputDiv = document.getElementById(outputId);

    if (!outputDiv) return;

    if (times.length > 0) {
        outputDiv.innerHTML = 'Selected times: ' + times.join(', ');
    } else {
        outputDiv.innerHTML = 'No time selected';
    }



}

function addFriend(name){
    // Get current friends from localStorage or empty array if none
    let friends = JSON.parse(localStorage.getItem('friendsList') || '[]');

    // Check if person is already a friend
    if (!friends.includes(name)) {
        friends.push(name);
        localStorage.setItem('friendsList', JSON.stringify(friends));
        alert(name + " has been added to your friends!");
        // Refresh matches to update button state
        updateMatches();
    } else {
        alert(name + " is already your friend.");
    }
}
