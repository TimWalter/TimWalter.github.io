window.onload = function () {

// Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlighter);
    const SCROLL_BUFFER_BOTTOM = 200;  // The last X px always belong to the last section

    function navHighlighter() {

        // Get current scroll position
        let scrollY = window.pageYOffset;

        var scrollMaxY = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;

        // Now we loop through sections to get height, top and ID values for each
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            sectionId = current.getAttribute("id");

            var maxSectionTop = 0;
            sections.forEach(section => {
                if (section.offsetTop > maxSectionTop) {
                    maxSectionTop = section.offsetTop;
                }
            });

            const isLastSection = current.offsetTop === maxSectionTop;

            /*
            - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
            */
            if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight && scrollY < scrollMaxY - SCROLL_BUFFER_BOTTOM ||
                scrollY >= scrollMaxY - SCROLL_BUFFER_BOTTOM && isLastSection
            ) {
                document.querySelector(".section-links a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector(".section-links a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }

    navHighlighter();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

};

// Modal handling
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals();
        }
    });
});

// Clipboard copying
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.js-copy-clipboard') || []).forEach(($trigger) => {
        const content = $trigger.dataset.target;
        const $target = document.getElementById(content);

        $trigger.addEventListener('click', () => {
            navigator.clipboard.writeText($target.textContent);
        });
    });
});
