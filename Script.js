const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');

let commandHistory = [];
let historyIndex = -1;

// Welcome message with a guide
const welcomeMessage = 
    <div class="welcome">
        <h1>Welcome to Admral77's Terminal</h1>
        <p>Type <strong>help</strong> to see a list of available commands.</p>
        <p>Use the arrow keys to navigate through previous commands.</p>
    </div>
;

output.innerHTML += welcomeMessage;

const commands = {
    'help': 
        <div>Available commands:</div>
        <div>- ls blog: View list of blog posts</div>
        <div>- view blog [post_number]: View specific blog post (e.g., view blog 1)</div>
        <div>- ls projects: View list of projects</div>
        <div>- view project [project_number]: View specific project (e.g., view project 1)</div>
        <div>- cat skills: View your skills</div>
        <div>- echo contact: View contact information</div>
        <div>- sudo make me a sandwich: Ask the terminal to make a sandwich</div>
        <div>- rm -rf /: Try to delete everything (don’t do it!)</div>
        <div>- fortune: Get a random motivational quote</div>
        <div>- clear: Clear the terminal screen</div>
    ,
    'ls blog': 
        <div>blog/</div>
        <div>&nbsp;&nbsp;&nbsp;1. Introduction to Terminal-Themed Portfolios</div>
        <div>&nbsp;&nbsp;&nbsp;2. The Magic of JavaScript in Web Development</div>
        <div>&nbsp;&nbsp;&nbsp;3. Deploying Projects on GitHub Pages</div>
    ,
    'view blog 1': 
        <div class="full-page-blog">
            <h1>Introduction to Terminal-Themed Portfolios</h1>
            <p>Date: 2024-08-14</p>
            <p>This post introduces the concept of creating a portfolio website with a terminal theme, providing users with a unique and interactive way to explore your projects and skills.</p>
            <p>We explore the reasons why this design choice stands out, how it can be implemented using HTML, CSS, and JavaScript, and some best practices for making it both functional and visually appealing.</p>
            <p>Terminal-themed portfolios are not only a great way to showcase technical skills, but they also provide an engaging experience that sets you apart from others.</p>
        </div>
    ,
    'view blog 2': 
        <div class="full-page-blog">
            <h1>The Magic of JavaScript in Web Development</h1>
            <p>Date: 2024-08-15</p>
            <p>JavaScript is the backbone of interactivity on the web. In this blog post, we dive into how JavaScript can transform a static webpage into a dynamic experience.</p>
            <p>We’ll cover some essential JavaScript concepts, including DOM manipulation, event handling, and asynchronous programming, and how they can be used to create responsive and interactive user interfaces.</p>
            <p>By the end of this post, you’ll have a better understanding of how JavaScript works and why it’s such a powerful tool in web development.</p>
        </div>
    ,
    'view blog 3': 
        <div class="full-page-blog">
            <h1>Deploying Projects on GitHub Pages</h1>
            <p>Date: 2024-08-16</p>
            <p>Deploying your web projects has never been easier, thanks to GitHub Pages. This post guides you through the steps of deploying a project on GitHub Pages.</p>
            <p>We’ll cover everything from setting up your repository, configuring your project for deployment, and going live with your site. By the end, your project will be accessible to the world at a public URL.</p>
            <p>Whether it’s a portfolio, blog, or web app, GitHub Pages provides a free and simple way to showcase your work.</p>
        </div>
    ,
    'ls projects': 
        <div>projects/</div>
        <div>&nbsp;&nbsp;&nbsp;1. Terminal-Themed Portfolio Website</div>
    ,
    'view project 1': 
        <div class="full-page-project">
            <h1>Terminal-Themed Portfolio Website</h1>
            <p><strong>Description:</strong> This project is a personal portfolio website designed to look and feel like a Linux terminal. Users can type commands to navigate through the content, view blog posts, project details, and even interact with fun Easter eggs.</p>
            <p><strong>Features:</strong></p>
            <ul>
                <li>Interactive command-line interface</li>
                <li>Blog section with posts</li>
                <li>Projects section with detailed project pages</li>
                <li>Contact information display</li>
                <li>Fun Easter eggs and terminal-like responses</li>
            </ul>
            <p><strong>Technologies Used:</strong></p>
            <ul>
                <li>HTML5, CSS3, JavaScript</li>
                <li>Responsive Web Design</li>
                <li>Vanilla JavaScript for interactivity</li>
            </ul>
            <p><strong>Demo:</strong> <a href="https://admral77.pages.dev" target="_blank">View Live Demo</a></p>
            <p><strong>GitHub Repository:</strong> <a href="https://github.com/Admral77/terminal-portfolio" target="_blank">View on GitHub</a></p>
        </div>
    ,
    'cat skills': 
        <div>Skills/</div>
        <div>&nbsp;&nbsp;&nbsp;├── Languages: JavaScript, Python, C++</div>
        <div>&nbsp;&nbsp;&nbsp;├── Tools: Git, Docker, VSCode</div>
        <div>&nbsp;&nbsp;&nbsp;└── Platforms: Linux, AWS, Heroku</div>
    ,
    'echo contact': 
        <div>Contact Information:</div>
        <div>Email: <a href="mailto:drewmyname@proton.me">drewmyname@proton.me</a></div>
        <div>GitHub: <a href="https://github.com/Admral77" target="_blank">Admral77</a></div>
    ,
    'sudo make me a sandwich': 
        <div>Absolutely not. I'm a terminal, not a chef.</div>
    ,
    'rm -rf /': 
        <div>Nice try. Not on my watch.</div>
    ,
    'fortune': 
        <div>Keep pushing forward, you're doing great!</div>
    ,
    'clear': 'clear',
    'Amelia': 
        <div style="color: pink;">
            Amelia is my amazing girlfriend who brings so much joy into my life. 
            She's kind, smart, and beautiful, and I feel incredibly lucky to have her by my side.
            She's the one who always supports me, and this terminal wouldn't be complete without a special mention of her.
        </div>
    
};

const invalidCommandResponse = 'command not found: ';

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = commandInput.value.trim();
        let response;

        if (input === 'clear') {
            output.innerHTML = '';  // Clear the terminal screen
        } else {
            response = commands[input] || <div>${invalidCommandResponse}${input}</div>;
            output.innerHTML += <div><span class="prompt">admral77@terminal:~$</span> ${input}</div>;
            output.innerHTML += <div>${response}</div>;
        }

        // Add the command to history and reset history index
        if (input) {
            commandHistory.push(input);
            historyIndex = -1;
        }

        commandInput.value = '';
        window.scrollTo(0, document.body.scrollHeight);
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
