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
        });
    }

    // 6. Countdown Timer for 23/05/2026 with Seconds
    function initCountdown() {
        // Target date: 23 May 2026 at 04:00 PM (16:00:00)
        // Note: Month is 0-indexed (4 = May)
        const targetDate = new Date(2026, 4, 23, 16, 0, 0).getTime();

        // Select elements directly by ID
        const daysVal = document.getElementById('days');
        const hoursVal = document.getElementById('hours');
        const minutesVal = document.getElementById('minutes');
        const secondsVal = document.getElementById('seconds');

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // If the date has passed
            if (distance < 0) {
                [daysVal, hoursVal, minutesVal, secondsVal].forEach(el => {
                    if (el) el.textContent = "00";
                });
                return;
            }

            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update DOM with leading zeros
            if (daysVal) daysVal.textContent = String(days).padStart(2, '0');
            if (hoursVal) hoursVal.textContent = String(hours).padStart(2, '0');
            if (minutesVal) minutesVal.textContent = String(minutes).padStart(2, '0');
            if (secondsVal) secondsVal.textContent = String(seconds).padStart(2, '0');
        }

        // Run immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }

})();