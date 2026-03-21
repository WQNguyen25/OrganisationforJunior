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

    //method to Update matches
    function updateMatches() {
        const matchResultsElement = document.getElementById('matchResults');
        if (!matchResultsElement) return;

        let hasSelection = false;
        const sections = days.map(day => {
            const userTimes = getUserTimesForDay(day);
            if (userTimes.length === 0) {
                return `<div><strong>${day}:</strong> No times selected.</div>`;
            }

            hasSelection = true;
            const matchedPeople = People.map(person => {
                const shared = person.times.filter(time => userTimes.includes(time));
                if (shared.length === 0) return null;
                return `
                    <div style="margin-bottom: 8px; padding:6px; border-left: 3px solid #0d6efd; background:#fff;">
                        <strong>${person.name}</strong><br>
                        Available: ${person.times.join(', ')}<br>
                        Matching: ${shared.join(', ')}
                    </div>`;
            }).filter(Boolean);

            if (matchedPeople.length === 0) {
                return `<div><strong>${day}:</strong> No matching dummy people found for selected times (${userTimes.join(', ')}).</div>`;
            }

            return `<div><strong>${day} - Your times:</strong> ${userTimes.join(', ')}<br>${matchedPeople.join('')}</div>`;
        });

        if (!hasSelection) {
            matchResultsElement.innerHTML = '<p>No selected times yet. Pick times in the forms to see matching people.</p>';
            return;
        }

        matchResultsElement.innerHTML = sections.join('<hr>');
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

function addFriend(){
    const nameInput = document.getElementById('friendName');
