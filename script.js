const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');

let commandHistory = [];
let historyIndex = -1;

// Club information
const clubInfo = `
    <div class="welcome">
        <h1>Welcome to the Cybersecurity Club Terminal</h1>
        <p>We are dedicated to learning and improving cybersecurity skills. Our club provides resources, discussions, and hands-on practice in various areas of cybersecurity.</p>
        <p>Type <strong>help</strong> to see available commands.</p>
    </div>
`;

output.innerHTML += clubInfo;

const commands = {
    'help': `
        <div>Available commands:</div>
        <div>- info: Show information about the Cybersecurity Club</div>
        <div>- events: List upcoming club events</div>
        <div>- resources: Provide links to cybersecurity resources</div>
        <div>- contact: Show contact information</div>
        <div>- clear: Clear the terminal screen</div>
    `,
    'info': `
        <div>The Cybersecurity Club aims to enhance cybersecurity knowledge and skills among its members. We hold regular meetings, workshops, and collaborative projects to stay updated with the latest cybersecurity trends and threats.</div>
    `,
    'events': `
        <div>Upcoming Events:</div>
        <ul>
            <li>Monthly Meeting: 1st Monday of every month at 6 PM</li>
            <li>Workshop: Network Security Basics - 15th of this month at 4 PM</li>
            <li>Guest Speaker: Cyber Threats & Mitigation - 22nd of this month at 7 PM</li>
        </ul>
    `,
    'resources': `
        <div>Useful Cybersecurity Resources:</div>
        <ul>
            <li><a href="https://www.cybrary.it/" target="_blank">Cybrary</a> - Free cybersecurity training and courses</li>
            <li><a href="https://www.hackthebox.com/" target="_blank">Hack The Box</a> - Hands-on hacking practice and challenges</li>
            <li><a href="https://www.owasp.org/" target="_blank">OWASP</a> - Open Web Application Security Project</li>
        </ul>
    `,
    'contact': `
        <div>Contact us:</div>
        <div>Email: <a href="mailto:info@cybersecurityclub.com">info@cybersecurityclub.com</a></div>
        <div>Twitter: <a href="https://twitter.com/CyberSecClub" target="_blank">@CyberSecClub</a></div>
    `,
    'clear': 'clear',
};

const handleUserInput = (input) => {
    let response = '';

    if (commands[input]) {
        response = commands[input];
    } else {
        response = `<div class="error">Command not found: ${input}</div>`;
    }

    output.innerHTML += `<div><span class="prompt">club@terminal:~$</span> ${input}</div>`;
    output.innerHTML += `<div>${response}</div>`;

    commandHistory.push(input);
    historyIndex = -1;

    commandInput.value = '';
    window.scrollTo(0, document.body.scrollHeight);
};

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        const input = commandInput.value.trim().toLowerCase();
        handleUserInput(input);
    }

    // Handle arrow keys for command history navigation
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (event.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
            } else {
                historyIndex = -1;
            }
        }

        if (historyIndex !== -1) {
            commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else {
            commandInput.value = '';
        }
    }
});
