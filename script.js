document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleIcon = themeToggle ? themeToggle.querySelector("i") : null;
    const themeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    const getSystemTheme = () => (themeMedia && themeMedia.matches ? "dark" : "light");

    const getActiveTheme = () => root.dataset.theme || getSystemTheme();

    const setToggleIcon = () => {
        if (!themeToggleIcon) {
            return;
        }

        const isDark = getActiveTheme() === "dark";
        themeToggleIcon.className = isDark ? "bx bx-sun" : "bx bx-moon";
        if (themeToggle) {
            themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
        }
    };

    const applyTheme = (theme) => {
        if (theme === "light" || theme === "dark") {
            root.dataset.theme = theme;
        } else {
            delete root.dataset.theme;
        }
        setToggleIcon();
    };

    if (themeToggle) {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            applyTheme(storedTheme);
        } else {
            setToggleIcon();
        }

        themeToggle.addEventListener("click", () => {
            const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
            localStorage.setItem("theme", nextTheme);
            applyTheme(nextTheme);
        });

        if (themeMedia) {
            themeMedia.addEventListener("change", () => {
                if (!root.dataset.theme) {
                    setToggleIcon();
                }
            });
        }
    }

    const navLinks = Array.from(document.querySelectorAll(".navbar .nav-link"));
    const sections = Array.from(document.querySelectorAll("header#home, section[id]"));
    const navbar = document.querySelector(".site-navbar");
    const navCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = navCollapse ? new bootstrap.Collapse(navCollapse, { toggle: false }) : null;

    const getOffset = () => (navbar ? navbar.offsetHeight + 12 : 88);

    const setActiveLink = () => {
        const scrollY = window.scrollY + getOffset() + 4;
        let activeId = "home";

        for (const section of sections) {
            if (scrollY >= section.offsetTop) {
                activeId = section.id;
            }
        }

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", isActive);
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            const top = target.offsetTop - getOffset();
            window.scrollTo({ top, behavior: "smooth" });

            if (navCollapse && navCollapse.classList.contains("show") && bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.className = "scroll-top-btn";
    scrollTopBtn.setAttribute("aria-label", "Back to top");
    scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const onScroll = () => {
        setActiveLink();
        scrollTopBtn.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setActiveLink);

    setActiveLink();

    // Experience tabs
    const expTabs = document.querySelectorAll(".exp-tab");
    const expPanels = document.querySelectorAll(".exp-panel");

    expTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            expTabs.forEach((t) => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            expPanels.forEach((p) => p.classList.remove("active"));

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            const panel = document.querySelector(`.exp-panel[data-panel="${tab.dataset.tab}"]`);
            if (panel) panel.classList.add("active");
        });
    });

    // Typewriter effect for hero eyebrow roles
    const typedEl = document.getElementById("typed-role");
    if (typedEl) {
        const roles = [
            "Frontend Developer",
            "IT Support Specialist",
            "Graphic Designer",
            "Data Manager",
            "Certified IT Technician"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 100;

        function tick() {
            const current = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
                delay = 45;
            } else {
                charIndex++;
                delay = 95;
            }

            typedEl.textContent = current.slice(0, charIndex);

            if (!isDeleting && charIndex === current.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;
            }

            setTimeout(tick, delay);
        }

        // Start after hero fade-in animations complete
        setTimeout(tick, 900);
    }
});
