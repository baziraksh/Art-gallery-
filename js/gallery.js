// Sample artwork data (in a real application, this would come from a backend)
const artworks = [
    {
        id: 1,
        title: "Modern Expressions",
        artist: "John Doe",
        category: "painting",
        image: "images/img1.webp",
        description: "A vibrant exploration of modern art expressions."
    },
    {
        id: 2,
        title: "Digital Dreams",
        artist: "Sarah Wilson",
        category: "digital",
        image: "images/img2.webp",
        description: "Digital artwork pushing the boundaries of imagination."
    },
    {
        id: 3,
        title: "Nature's Beauty",
        artist: "Michael Chen",
        category: "photography",
        image: "images/img3.webp",
        description: "Capturing the essence of natural beauty."
    },
    {
        id: 4,
        title: "Abstract Thoughts",
        artist: "Emma Davis",
        category: "painting",
        image: "images/img4.webp",
        description: "Abstract interpretation of human thoughts."
    },
    {
        id: 5,
        title: "Digital Landscape",
        artist: "Alex Thompson",
        category: "digital",
        image: "images/img5.webp",
        description: "A futuristic view of digital landscapes."
    },
    {
        id: 6,
        title: "Urban Life",
        artist: "Jessica Brown",
        category: "photography",
        image: "images/img6.webp",
        description: "Capturing the essence of modern urban life."
    }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxArtist = document.getElementById('lightbox-artist');
const lightboxDescription = document.getElementById('lightbox-description');
const loadMoreBtn = document.getElementById('load-more');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentPage = 1;
const itemsPerPage = 6;
let currentFilter = 'all';

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        loadArtworks();
    });
});

// Load artworks function
function loadArtworks() {
    const filteredArtworks = currentFilter === 'all' 
        ? artworks 
        : artworks.filter(art => art.category === currentFilter);
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageArtworks = filteredArtworks.slice(start, end);

    if (currentPage === 1) {
        gallery.innerHTML = '';
    }

    pageArtworks.forEach(artwork => {
        const artworkElement = createArtworkElement(artwork);
        gallery.appendChild(artworkElement);
    });

    // Show/hide load more button
    loadMoreBtn.style.display = end < filteredArtworks.length ? 'block' : 'none';
}

// Create artwork element
function createArtworkElement(artwork) {
    const div = document.createElement('div');
    div.className = 'artwork-card';
    div.innerHTML = `
        <div class="img-container">
            <img src="${artwork.image}" alt="${artwork.title}">
        </div>
        <div class="artwork-info">
            <h3>${artwork.title}</h3>
            <p>By ${artwork.artist}</p>
            <span class="artwork-category">${artwork.category}</span>
        </div>
    `;

    div.addEventListener('click', () => openLightbox(artwork));
    return div;
}

// Lightbox functionality
function openLightbox(artwork) {
    lightboxImg.src = artwork.image;
    lightboxTitle.textContent = artwork.title;
    lightboxArtist.textContent = `By ${artwork.artist}`;
    lightboxDescription.textContent = artwork.description;
    lightbox.classList.add('active');
}

// Close lightbox
document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Load more button
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadArtworks();
});

// Initial load
loadArtworks();