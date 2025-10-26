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


// Theme toggle: apply stored or system preference, persist changes, and swap themed images.
(function () {
    var STORAGE_KEY = 'color-mode';

    function systemMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    function storedMode() {
        try { return localStorage.getItem(STORAGE_KEY); } catch(e) { return null; }
    }
    function setAttr(mode) {
        document.documentElement.setAttribute('data-bs-theme', mode);
    }
    function swapThemeImages(mode) {
        document.querySelectorAll('[data-theme-img]').forEach(function (img) {
            var lightSrc = img.getAttribute('data-light');
            var darkSrc  = img.getAttribute('data-dark');

            // Optional heuristic: if only data-light provided and it's an .svg, try *_dark.svg
            if (!darkSrc && lightSrc && /\.svg$/i.test(lightSrc)) {
                darkSrc = lightSrc.replace(/\.svg$/i, '_dark.svg');
            }
            var target = (mode === 'dark') ? darkSrc : lightSrc;
            if (target && img.getAttribute('src') !== target) {
                img.setAttribute('src', target);
            }
        });
    }
    function apply(mode) {
        setAttr(mode);
        swapThemeImages(mode);
        document.dispatchEvent(new CustomEvent('theme-changed', { detail: { mode: mode }}));
        // Reflect in toggle if present
        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            if (!storedMode()) {
                // If no override, reflect system
                toggle.checked = (systemMode() === 'dark');
            } else {
                toggle.checked = (mode === 'dark');
            }
        }
    }
    function setOverride(valOrNull) {
        try {
            if (valOrNull === null) {
                localStorage.removeItem(STORAGE_KEY);
                apply(systemMode());
            } else {
                localStorage.setItem(STORAGE_KEY, valOrNull);
                apply(valOrNull);
            }
        } catch (e) {
            apply(valOrNull || systemMode());
        }
    }

    // Initial apply (honor stored override or system)
    apply(storedMode() || systemMode());

    // React to system changes when no override is set
    var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq && mq.addEventListener) {
        mq.addEventListener('change', function (e) {
            if (!storedMode()) {
                apply(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Hook up toggle when DOM is ready (in case element isn't present immediately)
    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            // checked = dark
            toggle.checked = (document.documentElement.getAttribute('data-bs-theme') === 'dark');
            toggle.addEventListener('change', function () {
                setOverride(toggle.checked ? 'dark' : 'light');
            });
        }
        // Late pass for images that loaded after script
        swapThemeImages(document.documentElement.getAttribute('data-bs-theme'));
    });
})();

// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.copy-icon-btn') || []).forEach(($btn) => {
    const targetId = $btn.dataset.target;
    if (!targetId) return;

    const originalHtml = $btn.innerHTML;
    let timeoutId = null;

    function indicateCopied() {
      $btn.classList.add('copied');
      $btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        $btn.classList.remove('copied');
        $btn.innerHTML = originalHtml; // restores fa-regular fa-clone
      }, 1500);
    }

    $btn.addEventListener('click', () => {
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return;
      const text = (codeEl.innerText || codeEl.textContent || '').trim();

      function fallback() {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); indicateCopied(); } catch (e) {}
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(indicateCopied).catch(fallback);
      } else {
        fallback();
      }
    });
  });
});