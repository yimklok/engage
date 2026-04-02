(function () {
    // 1. Get current URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    let toValue = urlParams.get('to');

    // 2. Elements
    const meltingElement = document.getElementById('myMeltingText');
    const button = document.getElementById('btn');
    const engagementContainer = document.getElementById('engagementContainer');
    const engagementDetails = document.getElementById('engagementDetails');
    const bg = document.querySelectorAll('.engagement-bg-section');
    const frame = document.getElementById('showFrame');

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
            // 1. Show the frame and the "show" background
            if (frame) frame.classList.remove('hide');
            button.classList.add('animate');
            bg[1].classList.remove('hide');
            // 2. Hide the old, show the new
            engagementContainer.classList.add('hide');
            engagementDetails.classList.remove('hide');

            // 3. THE FIX: Re-initialize and trigger
            // We target the new container specifically
            const newElements = document.querySelectorAll('[data-aos]');
            newElements.forEach((el) => {
                el.classList.remove('aos-animate'); // Reset state
            });
            setTimeout(() => {
                AOS.init(); // Re-scan the whole DOM
                AOS.refresh();
            }, 50);
            setTimeout(() => {
                button.classList.remove('animate');
            }, 600);
        });
    }

})();