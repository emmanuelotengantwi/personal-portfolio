document.addEventListener("DOMContentLoaded", () => {
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
});
