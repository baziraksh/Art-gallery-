// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});
