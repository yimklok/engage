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
        // Target date: 23 May 2026 at 00:00:00
        // Note: Month is 0-indexed in JavaScript (4 = May)
        const targetDate = new Date(2026, 4, 23, 0, 0, 0);

        // Get countdown elements - targeting the first <p> in each .item
        const items = document.querySelectorAll('.countdown .item');

        let daysElement = null;
        let hoursElement = null;
        let minutesElement = null;
        let secondsElement = null;

        if (items.length >= 4) {
            daysElement = items[0].querySelector('p:first-child');
            hoursElement = items[1].querySelector('p:first-child');
            minutesElement = items[2].querySelector('p:first-child');
            secondsElement = items[3].querySelector('p:first-child');
        }

        function updateCountdown() {
            const now = new Date();
            const timeRemaining = targetDate - now;

            // If the target date has passed
            if (timeRemaining < 0) {
                if (daysElement) daysElement.textContent = '00';
                if (hoursElement) hoursElement.textContent = '00';
                if (minutesElement) minutesElement.textContent = '00';
                if (secondsElement) secondsElement.textContent = '00';
                return;
            }

            // Calculate days, hours, minutes, seconds
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Update the DOM with leading zeros
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        }

        // Initial update
        updateCountdown();

        // Update every second (1000 ms) for smooth seconds display
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdown);
    } else {
        initCountdown();
    }

    const bars = [
        ['end', 'top'],
        ['side', 'top', 'left'],
        ['side', 'top', 'right'],
        ['middle'],
        ['side', 'bottom', 'left'],
        ['side', 'bottom', 'right'],
        ['end', 'bottom']
    ];

    const $main = document.querySelector('main');

    const addDigits = number => {
        const initGroup = (number, padding = 2) => {
            const $group = document.createElement('div');
            $group.classList.add('group');

            const digits = [...`${number}`.padStart(padding, 0)].map(digit => {
                const $digit = document.createElement('figure');
                $digit.classList.add('digit');
                $digit.setAttribute('data-digit', digit);
                bars.forEach(classes => {
                    const $span = document.createElement('span');
                    $span.classList.add(...classes);
                    $digit.append($span);
                });
                return $digit;
            });

            $group.append(...digits);

            return {
                element: $group,
                set number(val) {
                    number = val;
                    [...`${number}`.padStart(padding, 0).substring(`${number}`.length - 2)].forEach((digit, i) => {
                        digits[i].setAttribute('data-digit', digit);
                    });
                },

                get number() {
                    return number;
                }
            }
        }

        const $digits = document.createElement('div');
        $digits.classList.add('digits');
        const group = initGroup(number);
        const groupShadow1 = initGroup(number);
        const groupShadow2 = initGroup(number);
        groupShadow1.element.classList.add('shadow');
        groupShadow1.element.classList.add('shadow1');
        groupShadow2.element.classList.add('shadow');
        groupShadow2.element.classList.add('shadow2');
        $digits.append(group.element);
        $digits.append(groupShadow1.element);
        $digits.append(groupShadow2.element);
        $main.append($digits);

        return {
            set number(val) {
                number = val;
                group.number = val;
                groupShadow1.number = val;
                groupShadow2.number = val;
            },
            get number() {
                return number;
            }
        }
    }

    const addColon = () => {
        const $colonGroup = document.createElement('div');
        $colonGroup.classList.add('colon-group');
        const $colon = document.createElement('figure');
        $colon.append(document.createElement('span'));
        const $colonShadow1 = document.createElement('figure');
        $colonShadow1.append(document.createElement('span'));
        const $colonShadow2 = document.createElement('figure');
        $colonShadow2.append(document.createElement('span'));
        $colon.classList.add('colon');
        $colonShadow1.classList.add('colon', 'shadow', 'shadow1');
        $colonShadow2.classList.add('colon', 'shadow', 'shadow2');
        $colonGroup.append($colon);
        $colonGroup.append($colonShadow1);
        $colonGroup.append($colonShadow2);
        $main.append($colonGroup);
    }

    const init = () => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        const numberHour = addDigits(hours);
        addColon();
        const numberMinute = addDigits(minutes);
        addColon();
        const numberSecond = addDigits(seconds);

        const update = () => {
            now = new Date();
            let newSeconds = now.getSeconds();
            if (seconds !== newSeconds) {
                hours = now.getHours();
                minutes = now.getMinutes();
                seconds = newSeconds;
                numberHour.number = hours;
                numberMinute.number = minutes;
                numberSecond.number = seconds;
            }

            requestAnimationFrame(update);
        }
        update();
    }

    if (/^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
        document.body.classList.add('safari');
    }

    init();

})();