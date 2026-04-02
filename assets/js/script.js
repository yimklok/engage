(function () {
    // 1. Get current URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    let toValue = urlParams.get('to');

    // 2. Elements
    const meltingElement = document.getElementById('myMeltingText');
    const button = document.getElementById('btn');

    // 3. Logic for the Name
    let displayName = 'ភ្ញៀវកិត្តិយស'; // Fallback: "Honored Guest" in Khmer

    if (toValue && toValue.trim() !== '') {
        displayName = toValue.trim();
    }

    // 4. Update the UI
    if (meltingElement) {
        // Update the actual text inside the <h3>
        meltingElement.textContent = `${displayName}`;

        // Update the CSS variable for the melting animation effect
        meltingElement.style.setProperty('--dynamic-content', `"${displayName}"`);
    }

    // 5. Button Animation Logic
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.add('animate');
            setTimeout(() => {
                button.classList.remove('animate');
                // Optional: add navigation logic here if "opening" the card
            }, 600);
        });
    }

})();