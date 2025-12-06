// ===== Configuration =====
const API_BASE = "https://smart-product-finder-api.onrender.com";

// ===== EarnKaro Affiliate Configuration =====
// Uses EarnKaro API to convert any URL to affiliate link
const EARNKARO_CONFIG = {
    enabled: true,
    api_endpoint: `${API_BASE}/convert`  // Backend handles API call
};

// Affiliate link cache to avoid repeated API calls
const affiliateLinkCache = new Map();

// Supported stores for URL converter
const SUPPORTED_STORES = [
    { name: 'Amazon', domain: 'amazon.in', icon: '🛒', color: '#ff9900' },
    { name: 'Flipkart', domain: 'flipkart.com', icon: '🛍️', color: '#2874f0' },
    { name: 'Myntra', domain: 'myntra.com', icon: '👗', color: '#ff3f6c' },
    { name: 'Ajio', domain: 'ajio.com', icon: '👔', color: '#2874f0' },
    { name: 'Nykaa', domain: 'nykaa.com', icon: '💄', color: '#fc2779' },
    { name: 'Meesho', domain: 'meesho.com', icon: '🛒', color: '#570741' },
    { name: 'Tata CLiQ', domain: 'tatacliq.com', icon: '🏷️', color: '#5c2d91' }
];

// Convert product URL to affiliate link using EarnKaro API
async function getAffiliateLink(originalUrl, platform) {
    if (!EARNKARO_CONFIG.enabled) {
        return originalUrl;
    }
    
    // Check cache first
    if (affiliateLinkCache.has(originalUrl)) {
        return affiliateLinkCache.get(originalUrl);
    }
    
    try {
        // Call backend which calls EarnKaro API
        const response = await fetch(`${EARNKARO_CONFIG.api_endpoint}?url=${encodeURIComponent(originalUrl)}`);
        const data = await response.json();
        
        if (data.success && data.affiliate_url) {
            affiliateLinkCache.set(originalUrl, data.affiliate_url);
            return data.affiliate_url;
        }
        return originalUrl;
    } catch (e) {
        console.log("Affiliate conversion error:", e);
        return originalUrl;
    }
}

// Sync version for immediate use (uses cache or returns original)
function getAffiliateLinkSync(originalUrl, platform) {
    if (affiliateLinkCache.has(originalUrl)) {
        return affiliateLinkCache.get(originalUrl);
    }
    // Schedule async conversion for next time
    getAffiliateLink(originalUrl, platform);
    return originalUrl;
}

// ===== URL Converter Functions =====
function detectPlatform(url) {
    const urlLower = url.toLowerCase();
    for (const store of SUPPORTED_STORES) {
        if (urlLower.includes(store.domain)) {
            return store;
        }
    }
    return null;
}

async function convertUrl() {
    const urlInput = document.getElementById('urlInput');
    const convertBtn = document.getElementById('convertBtn');
    const convertResult = document.getElementById('convertResult');
    
    if (!urlInput || !convertBtn || !convertResult) return;
    
    const url = urlInput.value.trim();
    
    if (!url) {
        showConverterResult('error', 'Please enter a product URL');
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch {
        showConverterResult('error', 'Please enter a valid URL');
        return;
    }
    
    // Detect platform
    const platform = detectPlatform(url);
    if (!platform) {
        showConverterResult('error', 'Unsupported store. We support: Amazon, Flipkart, Myntra, Ajio, Nykaa, Meesho, Tata CLiQ');
        return;
    }
    
    // Show loading
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<span class="loading-spinner"></span> Converting...';
    convertResult.style.display = 'none';
    
    try {
        const affiliateUrl = await getAffiliateLink(url, platform.name);
        
        if (affiliateUrl !== url) {
            showConverterResult('success', affiliateUrl, platform);
        } else {
            showConverterResult('error', 'Could not convert URL. Please try again.');
        }
    } catch (error) {
        showConverterResult('error', 'Conversion failed. Please try again.');
    } finally {
        convertBtn.disabled = false;
        convertBtn.innerHTML = 'Convert to Affiliate Link 🔗';
    }
}

function showConverterResult(type, message, platform = null) {
    const convertResult = document.getElementById('convertResult');
    if (!convertResult) return;
    
    convertResult.style.display = 'block';
    
    if (type === 'success') {
        convertResult.innerHTML = `
            <div class="convert-success">
                <div class="platform-detected">
                    <span>${platform.icon}</span>
                    <span>${platform.name} detected</span>
                </div>
                <div class="affiliate-url-box">
                    <input type="text" value="${message}" readonly id="affiliateOutput">
                    <button onclick="copyAffiliateUrl()" class="copy-btn">📋 Copy</button>
                </div>
                <a href="${message}" target="_blank" class="open-link-btn">Open Link ↗️</a>
            </div>
        `;
    } else {
        convertResult.innerHTML = `
            <div class="convert-error">
                <span>❌</span>
                <span>${message}</span>
            </div>
        `;
    }
}

function copyAffiliateUrl() {
    const output = document.getElementById('affiliateOutput');
    if (output) {
        navigator.clipboard.writeText(output.value).then(() => {
            showSuccess('Affiliate link copied! 📋');
        }).catch(() => {
            output.select();
            document.execCommand('copy');
            showSuccess('Affiliate link copied! 📋');
        });
    }
}

// ===== Deal of the Day Functions =====
let dealOfDayTimer = null;

async function loadDealOfDay() {
    const dealSection = document.getElementById('dealOfDay');
    if (!dealSection) return;
    
    // Show only for logged-in users
    if (!currentUser) {
        dealSection.style.display = 'none';
        return;
    }
    
    dealSection.style.display = 'block';
    
    try {
        const response = await fetch(`${API_BASE}/deals?limit=5&min_discount=60`);
        if (!response.ok) throw new Error('Failed to fetch deals');
        
        const data = await response.json();
        if (data.deals && data.deals.length > 0) {
            // Pick a random hot deal
            const randomDeal = data.deals[Math.floor(Math.random() * data.deals.length)];
            displayDealOfDay(randomDeal);
        }
    } catch (error) {
        console.log('Could not load deal of day:', error);
        dealSection.style.display = 'none';
    }
}

function displayDealOfDay(deal) {
    const dealContent = document.getElementById('dealContent');
    if (!dealContent) return;
    
    // Cache product for wishlist
    productsCache[deal.id] = deal;
    const isInWishlist = userWishlist.some(p => p.id === deal.id);
    
    dealContent.innerHTML = `
        <div class="deal-card">
            <div class="deal-image">
                <img src="${deal.image}" alt="${escapeHtml(deal.title)}" onerror="this.src='https://via.placeholder.com/300x200?text=Deal'">
                <span class="deal-badge">🔥 ${deal.discount}% OFF</span>
            </div>
            <div class="deal-info">
                <span class="deal-platform platform-${deal.platform.toLowerCase()}">${deal.platform}</span>
                <h3 class="deal-title">${escapeHtml(deal.title)}</h3>
                <p class="deal-brand">${escapeHtml(deal.brand)}</p>
                <div class="deal-price">
                    <span class="current-price">₹${formatPrice(deal.price)}</span>
                    <span class="original-price">₹${formatPrice(deal.original_price)}</span>
                    <span class="savings">You save ₹${formatPrice(deal.original_price - deal.price)}</span>
                </div>
                <div class="deal-timer">
                    <span>⏰ Ends in: </span>
                    <span id="dealTimer">23:59:59</span>
                </div>
                <div class="deal-actions">
                    <a href="${getAffiliateLinkSync(deal.affiliate_url, deal.platform)}" target="_blank" class="deal-buy-btn">
                        Grab Deal 🛒
                    </a>
                    <button class="deal-wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="handleWishlistClick('${deal.id}')">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Start countdown timer
    startDealTimer();
}

function startDealTimer() {
    if (dealOfDayTimer) clearInterval(dealOfDayTimer);
    
    // Set end time to midnight
    const now = new Date();
    const endTime = new Date(now);
    endTime.setHours(23, 59, 59, 999);
    
    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            document.getElementById('dealTimer').textContent = 'Expired!';
            loadDealOfDay(); // Load new deal
            return;
        }
        
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        
        const timerEl = document.getElementById('dealTimer');
        if (timerEl) {
            timerEl.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }
    
    updateTimer();
    dealOfDayTimer = setInterval(updateTimer, 1000);
}

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
}

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
    
    // Pre-convert affiliate links in background
    preConvertAffiliateLinks(data.products);
}

// Pre-convert affiliate links for all products
async function preConvertAffiliateLinks(products) {
    for (const product of products) {
        if (!affiliateLinkCache.has(product.affiliate_url)) {
            try {
                const affiliateUrl = await getAffiliateLink(product.affiliate_url, product.platform);
                // Update the button href
                const btn = document.querySelector(`[data-original-url="${product.affiliate_url}"]`);
                if (btn) {
                    btn.href = affiliateUrl;
                }
            } catch (e) {
                console.log("Pre-convert error:", e);
            }
        }
    }
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
                <a href="${getAffiliateLinkSync(product.affiliate_url, product.platform)}" target="_blank" rel="noopener noreferrer" class="buy-btn" data-original-url="${product.affiliate_url}" data-platform="${product.platform}">
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
    
    // URL Converter button
    const convertBtn = document.getElementById('convertBtn');
    if (convertBtn) {
        convertBtn.addEventListener('click', convertUrl);
    }
    
    // URL input enter key
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') convertUrl();
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
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
            updateAuthUI(user);
            if (user) {
                loadWishlist();
                loadDealOfDay();
            } else {
                userWishlist = [];
                updateWishlistCount();
                hideDealOfDay();
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Update Auth UI
function updateAuthUI(user) {
    const authBtn = document.getElementById('authBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const wishlistNav = document.getElementById('wishlistNav');
    const historyNav = document.getElementById('historyNav');
    
    if (user) {
        if (authBtn) authBtn.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            if (userName) userName.textContent = user.displayName || user.email?.split('@')[0] || 'User';
        }
        if (wishlistNav) wishlistNav.style.display = 'flex';
        if (historyNav) historyNav.style.display = 'flex';
    } else {
        if (authBtn) authBtn.style.display = 'flex';
        if (userInfo) userInfo.style.display = 'none';
        if (wishlistNav) wishlistNav.style.display = 'none';
        if (historyNav) historyNav.style.display = 'none';
    }
}

// Hide deal of day for non-logged users
function hideDealOfDay() {
    const dealSection = document.getElementById('dealOfDay');
    if (dealSection) dealSection.style.display = 'none';
}

// Logout function
async function logout() {
    if (window.auth) {
        try {
            await window.auth.signOut();
            showSuccess('Logged out successfully!');
            window.location.reload();
        } catch (error) {
            showError('Logout failed');
        }
    }
}
