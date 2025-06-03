// Submit form handling
const submitForm = document.getElementById('submit-form');
const imageInput = document.getElementById('artwork-image');
const imagePreview = document.getElementById('image-preview');
const fileUploadLabel = document.querySelector('.file-upload-label span');

// Image preview functionality
function handleImagePreview(file) {
    if (!file) {
        imagePreview.innerHTML = '';
        return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, WebP, etc.)');
        imageInput.value = '';
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        imageInput.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.innerHTML = `
            <div class="preview-container">
                <img src="${e.target.result}" alt="Preview" class="preview-image">
                <button type="button" class="remove-image" aria-label="Remove image">×</button>
            </div>`;

        // Add remove button functionality
        const removeButton = imagePreview.querySelector('.remove-image');
        removeButton.addEventListener('click', () => {
            imageInput.value = '';
            imagePreview.innerHTML = '';
            fileUploadLabel.textContent = 'Choose a file';
        });
    };

    reader.onerror = () => {
        alert('Error reading file');
        imageInput.value = '';
    };

    reader.readAsDataURL(file);
}

// Image input change handler
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImagePreview(file);
        fileUploadLabel.textContent = file.name;
    } else {
        fileUploadLabel.textContent = 'Choose a file';
    }
});

// Drag and drop functionality
const dropZone = document.querySelector('.file-upload');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropZone.classList.add('drag-over');
}

function unhighlight() {
    dropZone.classList.remove('drag-over');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const file = e.dataTransfer.files[0];
    if (file) {
        imageInput.files = e.dataTransfer.files;
        handleImagePreview(file);
        fileUploadLabel.textContent = file.name;
    }
}

// Form submission
submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!imageInput.files[0]) {
        alert('Please select an image for your artwork');
        return;
    }

    // Get form data
    const formData = new FormData();
    formData.append('artist-name', document.getElementById('artist-name').value);
    formData.append('artwork-title', document.getElementById('artwork-title').value);
    formData.append('artwork-category', document.getElementById('artwork-category').value);
    formData.append('artwork-description', document.getElementById('artwork-description').value);
    formData.append('artwork-image', imageInput.files[0]);

    try {
        // Show loading state
        const submitButton = submitForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // In a real application, you would send this data to a server
        // Simulating server delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        alert('Thank you for submitting your artwork! It will be reviewed shortly.');
        
        // Reset form
        submitForm.reset();
        imagePreview.innerHTML = '';
        fileUploadLabel.textContent = 'Choose a file';
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    } catch (error) {
        alert('Error submitting form. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});
