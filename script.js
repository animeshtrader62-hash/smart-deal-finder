// ===== Configuration =====
const API_BASE = "https://smart-product-finder-api.onrender.com";

// ===== DOM Elements =====
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const loadingContainer = document.getElementById("loadingContainer");
const productsGrid = document.getElementById("productsGrid");
const resultsHeader = document.getElementById("resultsHeader");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const initialState = document.getElementById("initialState");
const quickBtns = document.querySelectorAll(".quick-btn");

// Filter inputs
const platformInput = document.getElementById("platform");
const categoryInput = document.getElementById("category");
const brandInput = document.getElementById("brand");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const minDiscountInput = document.getElementById("minDiscount");
const sortByInput = document.getElementById("sortBy");

// ===== State =====
let userWishlist = [];
let currentUser = null;
let productsCache = {}; // Store products by ID for wishlist

// ===== Firestore Functions =====

// Load wishlist from Firestore
async function loadWishlist() {
    if (!currentUser || !window.db) return;
    
    try {
        const doc = await window.db.collection('users').doc(currentUser.uid).get();
        if (doc.exists && doc.data().wishlist) {
            userWishlist = doc.data().wishlist;
            updateWishlistCount();
        }
    } catch (error) {
        console.log("Could not load wishlist:", error);
    }
}

// Add to wishlist
async function addToWishlist(product) {
    if (!currentUser) {
        showError("Please login to add to wishlist");
        return;
    }
    
    if (userWishlist.some(p => p.id === product.id)) {
        showError("Already in wishlist!");
        return;
    }
    
    try {
        userWishlist.push({
            id: product.id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            original_price: product.original_price,
            discount: product.discount,
            image: product.image,
            platform: product.platform,
            affiliate_url: product.affiliate_url,
            rating: product.rating,
            reviews: product.reviews,
            addedAt: new Date().toISOString()
        });
        
        await window.db.collection('users').doc(currentUser.uid).set({
            wishlist: userWishlist
        }, { merge: true });
        
        updateWishlistCount();
        updateHeartIcon(product.id, true);
        showSuccess("Added to wishlist! ❤️");
    } catch (error) {
        console.error("Wishlist error:", error);
        showError("Failed to add to wishlist");
    }
}

// Remove from wishlist
async function removeFromWishlist(productId) {
    if (!currentUser) return;
    
    try {
        userWishlist = userWishlist.filter(p => p.id !== productId);
        
        await window.db.collection('users').doc(currentUser.uid).set({
            wishlist: userWishlist
        }, { merge: true });
        
        updateWishlistCount();
        updateHeartIcon(productId, false);
        showSuccess("Removed from wishlist");
        
        // Refresh if viewing wishlist
        if (document.getElementById('wishlistNav')?.classList.contains('active')) {
            displayWishlist();
        }
    } catch (error) {
        console.error("Remove wishlist error:", error);
    }
}

// Toggle wishlist
function toggleWishlist(product) {
    const isInWishlist = userWishlist.some(p => p.id === product.id);
    if (isInWishlist) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
}

// Update heart icon on product card
function updateHeartIcon(productId, isActive) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (card) {
        const btn = card.querySelector('.wishlist-btn');
        if (btn) {
            if (isActive) {
                btn.classList.add('active');
                btn.innerHTML = '❤️';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '🤍';
            }
        }
    }
}

// Update wishlist count
function updateWishlistCount() {
    const countEl = document.getElementById('wishlistCount');
    if (countEl) {
        countEl.textContent = userWishlist.length > 0 ? `(${userWishlist.length})` : '';
    }
}

// Display wishlist
function displayWishlist() {
    initialState.style.display = "none";
    noResults.style.display = "none";
    hideLoading();
    
    if (!currentUser) {
        showError("Please login to view wishlist");
        return;
    }
    
    // Re-cache wishlist products for heart icon toggle
    userWishlist.forEach(p => { productsCache[p.id] = p; });
    
    if (userWishlist.length === 0) {
        productsGrid.innerHTML = "";
        resultsHeader.style.display = "block";
        resultsCount.textContent = "❤️ Your Wishlist";
        noResults.style.display = "block";
        noResults.innerHTML = `
            <div class="no-results-icon">❤️</div>
            <h3>Wishlist is empty</h3>
            <p>Click the heart icon on products to save them here</p>
        `;
        return;
    }
    
    resultsHeader.style.display = "block";
    resultsCount.textContent = `❤️ Your Wishlist (${userWishlist.length} items)`;
    productsGrid.innerHTML = userWishlist.map(product => createProductCard(product)).join("");
}

// Save search history
async function saveSearchHistory(query, filters) {
    if (!currentUser || !window.db) return;
    
    try {
        const searchEntry = {
            query: query || '',
            filters: filters,
            timestamp: new Date().toISOString()
        };
        
        const doc = await window.db.collection('users').doc(currentUser.uid).get();
        let history = doc.exists && doc.data().searchHistory ? doc.data().searchHistory : [];
        
        history.unshift(searchEntry);
        history = history.slice(0, 20);
        
        await window.db.collection('users').doc(currentUser.uid).set({
            searchHistory: history
        }, { merge: true });
    } catch (error) {
        console.log("Could not save search history:", error);
    }
}

// Display search history
async function displaySearchHistory() {
    if (!currentUser) {
        showError("Please login to view history");
        return;
    }
    
    initialState.style.display = "none";
    noResults.style.display = "none";
    productsGrid.innerHTML = "";
    hideLoading();
    
    try {
        const doc = await window.db.collection('users').doc(currentUser.uid).get();
        const history = doc.exists && doc.data().searchHistory ? doc.data().searchHistory : [];
        
        resultsHeader.style.display = "block";
        resultsCount.textContent = "🕐 Recent Searches";
        
        if (history.length === 0) {
            noResults.style.display = "block";
            noResults.innerHTML = `
                <div class="no-results-icon">🕐</div>
                <h3>No search history</h3>
                <p>Your recent searches will appear here</p>
            `;
            return;
        }
        
        productsGrid.innerHTML = `
            <div class="history-list">
                ${history.map((item, index) => `
                    <div class="history-item" onclick="replaySearch(${index})">
                        <span class="history-icon">🔍</span>
                        <div class="history-details">
                            <span class="history-query">${item.query || 'All Products'}</span>
                            <span class="history-filters">
                                ${item.filters.platform ? `Platform: ${item.filters.platform}` : ''}
                                ${item.filters.category ? `Category: ${item.filters.category}` : ''}
                                ${item.filters.minDiscount ? `${item.filters.minDiscount}%+ Off` : ''}
                            </span>
                            <span class="history-time">${formatTimeAgo(item.timestamp)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error("History error:", error);
        showError("Failed to load history");
    }
}

// Replay search
async function replaySearch(index) {
    try {
        const doc = await window.db.collection('users').doc(currentUser.uid).get();
        const history = doc.data().searchHistory;
        const search = history[index];
        
        if (search.filters.platform) platformInput.value = search.filters.platform;
        if (search.filters.category) categoryInput.value = search.filters.category;
        if (search.filters.minDiscount) minDiscountInput.value = search.filters.minDiscount;
        
        const searchQuery = document.getElementById('searchQuery');
        if (searchQuery && search.query) searchQuery.value = search.query;
        
        setActiveNav('deals');
        searchProducts();
    } catch (error) {
        console.error("Replay search error:", error);
    }
}

// ===== Event Listeners =====
searchBtn.addEventListener("click", searchProducts);
clearBtn.addEventListener("click", clearFilters);

quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;
        
        btn.classList.toggle("active");
        
        if (filterType === "platform") {
            platformInput.value = btn.classList.contains("active") ? filterValue : "";
        } else if (filterType === "category") {
            categoryInput.value = btn.classList.contains("active") ? filterValue : "";
        } else if (filterType === "discount") {
            minDiscountInput.value = btn.classList.contains("active") ? filterValue : "";
        }
        
        setActiveNav('deals');
        searchProducts();
    });
});

document.querySelectorAll(".filter-group input").forEach(input => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchProducts();
    });
});

// ===== Main Search Function =====
async function searchProducts() {
    showLoading();
    setActiveNav('deals');

    const params = new URLSearchParams();
    
    const searchQuery = document.getElementById('searchQuery')?.value.trim() || '';
    const platform = platformInput.value.trim();
    const category = categoryInput.value.trim();
    const brand = brandInput.value.trim();
    const minPrice = minPriceInput.value.trim();
    const maxPrice = maxPriceInput.value.trim();
    const minDiscount = minDiscountInput.value.trim();
    const sortBy = sortByInput.value;

    if (searchQuery) params.append("q", searchQuery);
    if (platform) params.append("platform", platform);
    if (category) params.append("category", category);
    if (brand) params.append("brand", brand);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (minDiscount) params.append("min_discount", minDiscount);
    if (sortBy) params.append("sort_by", sortBy);

    // Save to history
    saveSearchHistory(searchQuery, { platform, category, minDiscount });

    try {
        const response = await fetch(`${API_BASE}/search?${params.toString()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error("Search error:", error);
        showError("Failed to fetch products. Please try again.");
        hideLoading();
    }
}

// ===== Display Products =====
function displayProducts(data) {
    hideLoading();
    initialState.style.display = "none";

    if (data.count === 0) {
        productsGrid.innerHTML = "";
        resultsHeader.style.display = "none";
        noResults.style.display = "block";
        noResults.innerHTML = `
            <div class="no-results-icon">😕</div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search for something else</p>
        `;
        return;
    }

    noResults.style.display = "none";
    resultsHeader.style.display = "block";
    resultsCount.textContent = `Found ${data.count} products`;
    productsGrid.innerHTML = data.products.map(product => createProductCard(product)).join("");
}

// ===== Create Product Card =====
function createProductCard(product) {
    const platformClass = `platform-${product.platform.toLowerCase()}`;
    const formattedPrice = formatPrice(product.price);
    const formattedOriginalPrice = formatPrice(product.original_price);
    const fallbackImage = "https://via.placeholder.com/250x200?text=No+Image";
    
    // Cache product for wishlist
    productsCache[product.id] = product;
    
    const isInWishlist = userWishlist.some(p => p.id === product.id);
    const wishlistBtnClass = isInWishlist ? 'wishlist-btn active' : 'wishlist-btn';
    const wishlistIcon = isInWishlist ? '❤️' : '🤍';

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${escapeHtml(product.title)}" class="product-image"
                    onerror="this.src='${fallbackImage}'" loading="lazy">
                <button class="${wishlistBtnClass}" 
                    onclick="handleWishlistClick('${product.id}')"
                    title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                    ${wishlistIcon}
                </button>
                ${product.discount >= 50 ? '<span class="product-badge">🔥 Hot Deal</span>' : ''}
            </div>
            <div class="product-info">
                <span class="product-platform ${platformClass}">${product.platform}</span>
                <div class="product-brand">${escapeHtml(product.brand)}</div>
                <h3 class="product-title">${escapeHtml(product.title)}</h3>
                <div class="product-price-section">
                    <span class="product-price">₹${formattedPrice}</span>
                    <span class="product-original-price">₹${formattedOriginalPrice}</span>
                    <span class="product-discount">(${product.discount}% OFF)</span>
                </div>
                <div class="product-rating">
                    <span class="rating-badge">${product.rating || 4.0} ★</span>
                    <span class="rating-count">(${formatCount(product.reviews || 100)} reviews)</span>
                </div>
                <a href="${product.affiliate_url}" target="_blank" rel="noopener noreferrer" class="buy-btn">
                    Buy Now 🛒
                </a>
            </div>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Handle wishlist click
function handleWishlistClick(productId) {
    const product = productsCache[productId];
    if (product) {
        toggleWishlist(product);
    } else {
        showError("Product not found");
    }
}

// ===== Helper Functions =====
function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function formatCount(count) {
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count;
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

function showLoading() {
    loadingContainer.style.display = "block";
    productsGrid.innerHTML = "";
    resultsHeader.style.display = "none";
    noResults.style.display = "none";
    initialState.style.display = "none";
}

function hideLoading() {
    loadingContainer.style.display = "none";
}

function showError(message) {
    const toast = document.createElement("div");
    toast.className = "error-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showSuccess(message) {
    const toast = document.createElement("div");
    toast.className = "success-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function setActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (page === 'wishlist') {
        document.getElementById('wishlistNav')?.classList.add('active');
    } else if (page === 'history') {
        document.getElementById('historyNav')?.classList.add('active');
    } else {
        document.querySelector('.nav-link')?.classList.add('active');
    }
}

function clearFilters() {
    platformInput.value = "";
    categoryInput.value = "";
    brandInput.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    minDiscountInput.value = "";
    sortByInput.value = "";
    
    const searchQuery = document.getElementById('searchQuery');
    if (searchQuery) searchQuery.value = "";

    quickBtns.forEach(btn => btn.classList.remove("active"));
    
    productsGrid.innerHTML = "";
    resultsHeader.style.display = "none";
    noResults.style.display = "none";
    initialState.style.display = "block";
}

// ===== Load Top Deals =====
async function loadTopDeals() {
    try {
        const response = await fetch(`${API_BASE}/deals?limit=8`);
        if (response.ok) {
            const data = await response.json();
            if (data.deals && data.deals.length > 0) {
                initialState.style.display = "none";
                resultsHeader.style.display = "block";
                resultsCount.textContent = "🔥 Top Deals for You";
                productsGrid.innerHTML = data.deals.map(product => createProductCard(product)).join("");
            }
        } else {
            initialState.style.display = "block";
        }
    } catch (error) {
        console.error("Could not load top deals:", error);
        initialState.style.display = "block";
    }
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
    loadTopDeals();
    
    // Wishlist nav click
    document.getElementById('wishlistNav')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav('wishlist');
        displayWishlist();
    });
    
    // History nav click
    document.getElementById('historyNav')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav('history');
        displaySearchHistory();
    });
    
    // Deals nav click (first nav link)
    document.querySelector('.nav-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav('deals');
        loadTopDeals();
    });
    
    // Auth state listener
    if (window.auth) {
        window.auth.onAuthStateChanged((user) => {
            currentUser = user;
            if (user) {
                loadWishlist();
            } else {
                userWishlist = [];
                updateWishlistCount();
            }
        });
    }
});
