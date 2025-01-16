document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for fixed header height (if any)
                behavior: 'smooth'
            });
        });
    });

    // 2. Scroll Animations (Element Visibility when in View)
    const elements = document.querySelectorAll('.animate-on-scroll');
    const handleScroll = () => {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.8) { // Trigger when 80% is in view
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load as well (to display initial visible elements)

    // 3. Image Lazy Loading (Improves performance by deferring non-critical images)
    const lazyImages = document.querySelectorAll('img.lazy');
    const loadImages = () => {
        lazyImages.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight) {
                image.src = image.dataset.src; // Lazy load the actual image
                image.classList.remove('lazy'); // Remove lazy class once image is loaded
            }
        });
    };
    window.addEventListener('scroll', loadImages);
    window.addEventListener('load', loadImages); // Trigger on initial page load

    // 4. Form Validation for Contact Form (Ensure necessary fields are filled)
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            if (!name.value || !email.value) {
                event.preventDefault();
                alert('Please fill out all fields!');
            }
        });
    }

    // 5. Tooltip for Skills/Experience/Links (Optional interactive hover effects)
    const tooltipElems = document.querySelectorAll('.tooltip');
    tooltipElems.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            const tooltip = elem.querySelector('.tooltip-text');
            tooltip.style.opacity = 1;
            tooltip.style.visibility = 'visible';
        });
        elem.addEventListener('mouseleave', () => {
            const tooltip = elem.querySelector('.tooltip-text');
            tooltip.style.opacity = 0;
            tooltip.style.visibility = 'hidden';
        });
    });

    // 6. Sticky Navigation (if required, make the header stick at the top on scroll)
    const header = document.querySelector('header');
    if (header) {
        const headerOffset = header.offsetTop;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > headerOffset) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // 7. Back-to-top Button (Smooth scroll to top of the page)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerText = '↑';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/Hide back-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 8. Set Up Accordion for Sections (For better content organization)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px'; // Expand the section
            } else {
                content.style.maxHeight = 0; // Collapse the section
            }
        });
    });
});

// Optional Enhancements: Function to debounce resize and scroll events
const debounce = (func, delay) => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
};
window.addEventListener('resize', debounce(() => {
    // Add any reactivity or resizing features here (e.g., adjust font sizes, layout, etc.)
    console.log('Window resized');
}, 200));
