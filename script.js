document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scroll for Navbar Links
    const navbarLinks = document.querySelectorAll('.nav-link');

    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Contact Form Submission (Example Functionality)
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
});
