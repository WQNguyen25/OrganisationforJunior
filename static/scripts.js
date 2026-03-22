// Display stored times on page load
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
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let hasSelection = false;

    const sections = days.map(day => {
        const userTimes = JSON.parse(localStorage.getItem('selectedTimes' + day) || '[]');
        if (userTimes.length === 0) return null;

        hasSelection = true;
        const matchedPeople = People.map(person => {
            const shared = person.times.filter(time => userTimes.includes(time));
            if (shared.length === 0) return null;

            const isFriend = friends.includes(person.name);

            // Logic to switch buttons based on friendship status
            const actionButton = isFriend 
                ? `<button onclick="removeFriend('${person.name}')" class="btn btn-danger btn-sm">Remove Friend</button>`
                : `<button onclick="addFriend('${person.name}')" class="btn btn-outline-primary btn-sm">Add Friend</button>`;

            return `
                <div style="margin-bottom: 10px; padding:12px; border-left: 4px solid #0d6efd; background:#fff; display: flex; justify-content: space-between; align-items: center; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div>
                        <strong style="font-size: 1.1em;">${person.name} ${isFriend ? '<span class="badge bg-success">Friend</span>' : ''}</strong><br>
                        <small class="text-muted">Matches you at: ${shared.join(', ')}</small>
                    </div>
                    <div>${actionButton}</div>
                </div>`;
        }).filter(Boolean);

        if (matchedPeople.length === 0) return null;

        return `<div class="mb-4"><h4>${day}</h4>${matchedPeople.join('')}</div>`;
    }).filter(Boolean);

    if (!hasSelection || sections.length === 0) {
        matchResultsElement.innerHTML = '<p class="text-center p-4">No matches found for your selected times.</p>';
        return;
    }

    matchResultsElement.innerHTML = sections.join('');
}

window.addEventListener('DOMContentLoaded', function() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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

    // If on friends page, display friends
    if (document.getElementById('friendsDisplayList')) {
        displayFriends();
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
        // If on friends page, refresh friends list
        if (document.getElementById('friendsDisplayList')) {
            displayFriends();
        }
    } else {
        alert(name + " is already your friend.");
    }
}
function removeFriend(name){
    let friends = JSON.parse(localStorage.getItem('friendsList') || '[]');
    
    // Create a new array that includes everyone EXCEPT the person we're removing
    friends = friends.filter(friend => friend !== name);
    
    localStorage.setItem('friendsList', JSON.stringify(friends));
    
    // Refresh the UI to show the "Add" button again
    updateMatches();
    
    // If you have a dedicated friends list on the page, refresh that too
    if (document.getElementById('friendsDisplayList')) {
        displayFriends();
    }
}

function displayFriends() {
    const friendsListElement = document.getElementById('friendsDisplayList');
    if (!friendsListElement) return;

    const friends = JSON.parse(localStorage.getItem('friendsList') || '[]');

    if (friends.length === 0) {
        friendsListElement.innerHTML = '<li class="list-group-item">No friends added yet.</li>';
        return;
    }

    const friendsHtml = friends.map(friend => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${friend}
            <button onclick="removeFriend('${friend}')" class="btn btn-danger btn-sm">Remove</button>
        </li>
    `).join('');

    friendsListElement.innerHTML = friendsHtml;
}
