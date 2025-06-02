// Sample artwork data (in a real application, this would come from a backend)
const artworks = [
    {
        id: 1,
        title: 'Abstract Dreams',
        artist: 'John Doe',
        category: 'painting',
        image: 'https://source.unsplash.com/400x300/?abstract,art',
        description: 'A vibrant exploration of color and form.'
    },
    // Add more artwork items here
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
const itemsPerPage = 9;
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
        <img src="${artwork.image}" alt="${artwork.title}">
        <h3>${artwork.title}</h3>
        <p>By ${artwork.artist}</p>
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
