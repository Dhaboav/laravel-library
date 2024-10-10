document.addEventListener('DOMContentLoaded', () => {
    const lightModeButton = document.getElementById('light-mode');
    const darkModeButton = document.getElementById('dark-mode');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');

    // Helper function to apply theme
    function applyTheme(theme) {
        console.log("Applying theme:", theme); // Debugging log
        document.documentElement.classList.remove('dark', 'light'); // Remove previous themes
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            lightIcon.style.display = 'none'; // Hide light icon
            darkIcon.style.display = 'block'; // Show dark icon
        } else {
            document.documentElement.classList.add('light');
            lightIcon.style.display = 'block'; // Show light icon
            darkIcon.style.display = 'none'; // Hide dark icon
        }
        localStorage.setItem('theme', theme); // Store the theme in localStorage
    }

    // Determine initial theme state
    function getInitialTheme() {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        // Fallback to system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    }

    // Set initial state based on user preference or system
    applyTheme(getInitialTheme());

    // Event listeners for buttons
    lightModeButton.addEventListener('click', () => {
        applyTheme('light');
    });

    darkModeButton.addEventListener('click', () => {
        applyTheme('dark');
    });
});