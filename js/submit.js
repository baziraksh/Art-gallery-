// Submit form handling
const submitForm = document.getElementById('submit-form');
const imageInput = document.getElementById('artwork-image');
const imagePreview = document.getElementById('image-preview');

// Image preview functionality
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// File upload label update
const fileUploadLabel = document.querySelector('.file-upload-label span');
imageInput.addEventListener('change', () => {
    const fileName = imageInput.files[0]?.name || 'Choose a file';
    fileUploadLabel.textContent = fileName;
});

// Form submission
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData();
    formData.append('artist-name', document.getElementById('artist-name').value);
    formData.append('artwork-title', document.getElementById('artwork-title').value);
    formData.append('artwork-category', document.getElementById('artwork-category').value);
    formData.append('artwork-description', document.getElementById('artwork-description').value);
    formData.append('artwork-image', imageInput.files[0]);

    // In a real application, you would send this data to a server
    console.log('Form submitted with image');

    // Show success message
    alert('Thank you for submitting your artwork! It will be reviewed shortly.');
    submitForm.reset();
    imagePreview.innerHTML = '';
    fileUploadLabel.textContent = 'Choose a file';
});
