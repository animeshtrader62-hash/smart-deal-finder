// ===== Configuration =====
// Backend deployed on Render (FREE)
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

// ===== Event Listeners =====
searchBtn.addEventListener("click", searchProducts);
clearBtn.addEventListener("click", clearFilters);

// Quick filter buttons
quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;

        // Toggle active state
        btn.classList.toggle("active");

        // Apply filter
        if (filterType === "platform") {
            platformInput.value = btn.classList.contains("active") ? filterValue : "";
        } else if (filterType === "category") {
            categoryInput.value = btn.classList.contains("active") ? filterValue : "";
        } else if (filterType === "discount") {
            minDiscountInput.value = btn.classList.contains("active") ? filterValue : "";
        }

        // Search with new filter
        searchProducts();
    });
});

// Enter key to search
document.querySelectorAll(".filter-group input").forEach(input => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchProducts();
        }
    });
});

// ===== Main Search Function =====
async function searchProducts() {
    // Show loading
    showLoading();

    // Build query parameters
    const params = new URLSearchParams();

    const platform = platformInput.value.trim();
    const category = categoryInput.value.trim();
    const brand = brandInput.value.trim();
    const minPrice = minPriceInput.value.trim();
    const maxPrice = maxPriceInput.value.trim();
    const minDiscount = minDiscountInput.value.trim();
    const sortBy = sortByInput.value;

    if (platform) params.append("platform", platform);
    if (category) params.append("category", category);
    if (brand) params.append("brand", brand);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (minDiscount) params.append("min_discount", minDiscount);
    if (sortBy) params.append("sort_by", sortBy);

    const url = `${API_BASE}/search?${params.toString()}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

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
        return;
    }

    noResults.style.display = "none";
    resultsHeader.style.display = "block";
    resultsCount.textContent = `Found ${data.count} products`;

    productsGrid.innerHTML = data.products.map(product => createProductCard(product)).join("");
}

// ===== Create Product Card HTML =====
function createProductCard(product) {
    const platformClass = `platform-${product.platform.toLowerCase()}`;
    
    // Format price with commas
    const formattedPrice = formatPrice(product.price);
    const formattedOriginalPrice = formatPrice(product.original_price);

    // Fallback image if product image fails to load
    const fallbackImage = "https://via.placeholder.com/250x200?text=No+Image";

    return `
        <div class="product-card">
            <img 
                src="${product.image}" 
                alt="${product.title}" 
                class="product-image"
                onerror="this.src='${fallbackImage}'"
                loading="lazy"
            >
            <div class="product-info">
                <span class="product-platform ${platformClass}">${product.platform}</span>
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-price-section">
                    <span class="product-price">₹${formattedPrice}</span>
                    <span class="product-original-price">₹${formattedOriginalPrice}</span>
                    <span class="product-discount">(${product.discount}% OFF)</span>
                </div>
                
                <div class="product-rating">
                    <span class="rating-badge">
                        ${product.rating} ★
                    </span>
                    <span class="rating-count">(${formatCount(product.reviews)} reviews)</span>
                </div>
                
                <a href="${product.affiliate_url}" target="_blank" rel="noopener noreferrer" class="buy-btn">
                    Buy Now 🛒
                </a>
            </div>
        </div>
    `;
}

// ===== Helper Functions =====
function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function formatCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K";
    }
    return count;
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
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "error-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function clearFilters() {
    platformInput.value = "";
    categoryInput.value = "";
    brandInput.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    minDiscountInput.value = "";
    sortByInput.value = "";

    // Remove active state from quick buttons
    quickBtns.forEach(btn => btn.classList.remove("active"));

    // Reset to initial state
    productsGrid.innerHTML = "";
    resultsHeader.style.display = "none";
    noResults.style.display = "none";
    initialState.style.display = "block";
}

// ===== Load Top Deals on Page Load =====
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
        }
    } catch (error) {
        console.log("Could not load top deals:", error);
        // Keep showing initial state
    }
}

// Load top deals when page loads
document.addEventListener("DOMContentLoaded", loadTopDeals);

// ===== Login Button (Placeholder for Phase 5) =====
document.getElementById("loginBtn").addEventListener("click", () => {
    alert("Login feature coming soon! 🔐\n\nThis will use Firebase Authentication with:\n• Phone OTP\n• Email/Password\n• Google Sign-in");
});
