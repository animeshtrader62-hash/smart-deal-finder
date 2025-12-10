// ===== Configuration =====
const API_BASE = "https://smart-product-finder-api.onrender.com";

// ===== CATEGORIES DATA (Same as Telegram Bot) =====
const CATEGORIES = {
    "smartphones": {
        "name": "📱 Smartphones",
        "store": "flipkart",
        "search": "smartphones",
        "brands": {
            "samsung": "Samsung", "apple": "Apple", "oneplus": "OnePlus",
            "redmi": "Redmi", "realme": "Realme", "vivo": "Vivo",
            "oppo": "OPPO", "poco": "POCO", "iqoo": "iQOO",
            "motorola": "Motorola", "nothing": "Nothing", "google": "Google Pixel",
            "all": "All Brands"
        },
        "prices": [
            ["Under ₹7K", 0, 7000], ["₹7K-10K", 7000, 10000],
            ["₹10K-15K", 10000, 15000], ["₹15K-20K", 15000, 20000],
            ["₹20K-30K", 20000, 30000], ["₹30K-50K", 30000, 50000],
            ["₹50K-80K", 50000, 80000], ["Above ₹80K", 80000, 200000]
        ],
        "discounts": [["10%+", 10], ["20%+", 20], ["30%+", 30], ["40%+", 40]]
    },
    "laptops": {
        "name": "💻 Laptops",
        "store": "flipkart",
        "search": "laptops",
        "brands": {
            "hp": "HP", "dell": "Dell", "lenovo": "Lenovo",
            "asus": "ASUS", "acer": "Acer", "msi": "MSI",
            "apple": "Apple MacBook", "avita": "Avita", "infinix": "Infinix",
            "all": "All Brands"
        },
        "prices": [
            ["Under ₹25K", 0, 25000], ["₹25K-35K", 25000, 35000],
            ["₹35K-50K", 35000, 50000], ["₹50K-70K", 50000, 70000],
            ["₹70K-1L", 70000, 100000], ["Above ₹1L", 100000, 300000]
        ],
        "discounts": [["10%+", 10], ["20%+", 20], ["30%+", 30]]
    },
    "audio": {
        "name": "🎧 Audio",
        "store": "flipkart",
        "search": "headphones earphones",
        "brands": {
            "boat": "boAt", "noise": "Noise", "jbl": "JBL",
            "sony": "Sony", "oneplus": "OnePlus", "realme": "Realme",
            "samsung": "Samsung", "apple": "Apple AirPods", "zebronics": "Zebronics",
            "all": "All Brands"
        },
        "prices": [
            ["Under ₹500", 0, 500], ["₹500-1K", 500, 1000],
            ["₹1K-2K", 1000, 2000], ["₹2K-5K", 2000, 5000],
            ["₹5K-10K", 5000, 10000], ["Above ₹10K", 10000, 50000]
        ],
        "discounts": [["20%+", 20], ["30%+", 30], ["40%+", 40], ["50%+", 50]]
    },
    "smartwatches": {
        "name": "⌚ Smartwatches",
        "store": "flipkart",
        "search": "smartwatches",
        "brands": {
            "noise": "Noise", "fire-boltt": "Fire-Boltt", "boat": "boAt",
            "samsung": "Samsung", "apple": "Apple Watch", "amazfit": "Amazfit",
            "realme": "Realme", "oneplus": "OnePlus", "titan": "Titan",
            "all": "All Brands"
        },
        "prices": [
            ["Under ₹1K", 0, 1000], ["₹1K-2K", 1000, 2000],
            ["₹2K-5K", 2000, 5000], ["₹5K-10K", 5000, 10000],
            ["₹10K-20K", 10000, 20000], ["Above ₹20K", 20000, 100000]
        ],
        "discounts": [["20%+", 20], ["30%+", 30], ["40%+", 40], ["50%+", 50]]
    },
    "mens-tshirts": {
        "name": "👔 Men's T-Shirts",
        "store": "myntra",
        "search": "men-tshirts",
        "brands": {
            "puma": "Puma", "nike": "Nike", "adidas": "Adidas",
            "levis": "Levis", "hrx": "HRX", "us-polo": "US Polo",
            "roadster": "Roadster", "here-now": "HERE&NOW", "all": "All Brands"
        },
        "prices": [
            ["Under ₹300", 0, 300], ["₹300-500", 300, 500],
            ["₹500-800", 500, 800], ["₹800-1.2K", 800, 1200],
            ["₹1.2K-2K", 1200, 2000], ["Above ₹2K", 2000, 10000]
        ],
        "discounts": [["30%+", 30], ["40%+", 40], ["50%+", 50], ["60%+", 60]]
    },
    "mens-shirts": {
        "name": "👕 Men's Shirts",
        "store": "myntra",
        "search": "men-shirts",
        "brands": {
            "levis": "Levis", "louis-philippe": "Louis Philippe", "peter-england": "Peter England",
            "van-heusen": "Van Heusen", "allen-solly": "Allen Solly", "us-polo": "US Polo",
            "roadster": "Roadster", "all": "All Brands"
        },
        "prices": [
            ["Under ₹500", 0, 500], ["₹500-800", 500, 800],
            ["₹800-1.2K", 800, 1200], ["₹1.2K-2K", 1200, 2000],
            ["₹2K-3K", 2000, 3000], ["Above ₹3K", 3000, 15000]
        ],
        "discounts": [["30%+", 30], ["40%+", 40], ["50%+", 50], ["60%+", 60]]
    },
    "womens-dresses": {
        "name": "👗 Women's Dresses",
        "store": "myntra",
        "search": "women-dresses",
        "brands": {
            "only": "ONLY", "zara": "Zara", "hm": "H&M",
            "mango": "Mango", "forever-21": "Forever 21", "vero-moda": "Vero Moda",
            "sassafras": "SASSAFRAS", "athena": "Athena", "all": "All Brands"
        },
        "prices": [
            ["Under ₹500", 0, 500], ["₹500-1K", 500, 1000],
            ["₹1K-1.5K", 1000, 1500], ["₹1.5K-2K", 1500, 2000],
            ["₹2K-3K", 2000, 3000], ["Above ₹3K", 3000, 20000]
        ],
        "discounts": [["30%+", 30], ["40%+", 40], ["50%+", 50], ["60%+", 60], ["70%+", 70]]
    },
    "womens-kurtis": {
        "name": "🥻 Kurtis & Suits",
        "store": "myntra",
        "search": "kurtas-kurtis-suits",
        "brands": {
            "biba": "BIBA", "w": "W", "libas": "Libas",
            "aurelia": "Aurelia", "anouk": "Anouk", "rangmanch": "Rangmanch",
            "sangria": "Sangria", "all": "All Brands"
        },
        "prices": [
            ["Under ₹400", 0, 400], ["₹400-700", 400, 700],
            ["₹700-1K", 700, 1000], ["₹1K-1.5K", 1000, 1500],
            ["₹1.5K-2.5K", 1500, 2500], ["Above ₹2.5K", 2500, 15000]
        ],
        "discounts": [["30%+", 30], ["40%+", 40], ["50%+", 50], ["60%+", 60], ["70%+", 70]]
    },
    "womens-sarees": {
        "name": "🪭 Sarees",
        "store": "myntra",
        "search": "sarees",
        "brands": {
            "saree-mall": "Saree Mall", "mimosa": "Mimosa", "satrani": "Satrani",
            "kalini": "Kalini", "ishin": "Ishin", "inddus": "Inddus",
            "suta": "Suta", "all": "All Brands"
        },
        "prices": [
            ["Under ₹500", 0, 500], ["₹500-1K", 500, 1000],
            ["₹1K-2K", 1000, 2000], ["₹2K-3K", 2000, 3000],
            ["₹3K-5K", 3000, 5000], ["Above ₹5K", 5000, 50000]
        ],
        "discounts": [["30%+", 30], ["40%+", 40], ["50%+", 50], ["60%+", 60], ["70%+", 70]]
    },
    "shoes-men": {
        "name": "👟 Men's Shoes",
        "store": "myntra",
        "search": "men-sports-shoes",
        "brands": {
            "nike": "Nike", "adidas": "Adidas", "puma": "Puma",
            "reebok": "Reebok", "skechers": "Skechers", "campus": "Campus",
            "hrx": "HRX", "all": "All Brands"
        },
        "prices": [
            ["Under ₹1K", 0, 1000], ["₹1K-2K", 1000, 2000],
            ["₹2K-3K", 2000, 3000], ["₹3K-5K", 3000, 5000],
            ["₹5K-8K", 5000, 8000], ["Above ₹8K", 8000, 30000]
        ],
        "discounts": [["20%+", 20], ["30%+", 30], ["40%+", 40], ["50%+", 50]]
    },
    "shoes-women": {
        "name": "👠 Women's Shoes",
        "store": "myntra",
        "search": "women-heels",
        "brands": {
            "metro": "Metro", "inc-5": "Inc.5", "mochi": "Mochi",
            "catwalk": "Catwalk", "aldo": "Aldo", "steve-madden": "Steve Madden",
            "all": "All Brands"
        },
        "prices": [
            ["Under ₹800", 0, 800], ["₹800-1.5K", 800, 1500],
            ["₹1.5K-2.5K", 1500, 2500], ["₹2.5K-4K", 2500, 4000],
            ["₹4K-6K", 4000, 6000], ["Above ₹6K", 6000, 25000]
        ],
        "discounts": [["20%+", 20], ["30%+", 30], ["40%+", 40], ["50%+", 50]]
    },
    "beauty": {
        "name": "💄 Beauty",
        "store": "myntra",
        "search": "beauty-and-personal-care",
        "brands": {
            "maybelline": "Maybelline", "lakme": "Lakme", "loreal": "L'Oreal",
            "mac": "MAC", "nykaa": "Nykaa", "sugar": "Sugar",
            "mamaearth": "Mamaearth", "all": "All Brands"
        },
        "prices": [
            ["Under ₹200", 0, 200], ["₹200-400", 200, 400],
            ["₹400-700", 400, 700], ["₹700-1.2K", 700, 1200],
            ["₹1.2K-2K", 1200, 2000], ["Above ₹2K", 2000, 10000]
        ],
        "discounts": [["20%+", 20], ["30%+", 30], ["40%+", 40], ["50%+", 50]]
    }
};

// Store icons
const STORE_ICONS = {
    flipkart: "🛒",
    myntra: "👗",
    ajio: "🎯"
};

// Wizard state
let wizardState = {
    category: null,
    brand: null,
    brandName: '',
    priceMin: 0,
    priceMax: 999999,
    discount: 0,
    generatedUrl: ''
};

// ===== Category Wizard Functions =====
function initCategoryWizard() {
    // Tab switching
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const section = tab.dataset.tab;
            document.querySelectorAll('.cat-section').forEach(s => s.classList.remove('active'));
            document.querySelector(`.cat-section[data-section="${section}"]`).classList.add('active');
        });
    });
    
    // Category selection
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCategory(btn.dataset.cat));
    });
    
    // Back buttons
    document.getElementById('backToStep1')?.addEventListener('click', () => goToStep(1));
    document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('backToStep3')?.addEventListener('click', () => goToStep(3));
    
    // Skip discount
    document.getElementById('skipDiscount')?.addEventListener('click', () => {
        wizardState.discount = 0;
        showResult();
    });
    
    // New search
    document.getElementById('newSearchBtn')?.addEventListener('click', resetWizard);
    
    // Copy link
    document.getElementById('resultCopyBtn')?.addEventListener('click', () => {
        if (wizardState.generatedUrl) {
            navigator.clipboard.writeText(wizardState.generatedUrl).then(() => {
                const btn = document.getElementById('resultCopyBtn');
                btn.textContent = '✅ Copied!';
                setTimeout(() => btn.textContent = '📋 Copy Link', 2000);
            });
        }
    });
}

function selectCategory(catId) {
    const cat = CATEGORIES[catId];
    if (!cat) return;
    
    wizardState.category = catId;
    
    // Update progress
    updateProgress(2);
    
    // Populate brands
    const brandGrid = document.getElementById('brandGrid');
    brandGrid.innerHTML = '';
    
    for (const [brandId, brandName] of Object.entries(cat.brands)) {
        const btn = document.createElement('button');
        btn.className = 'brand-btn' + (brandId === 'all' ? ' all' : '');
        btn.textContent = brandName;
        btn.onclick = () => selectBrand(brandId, brandName);
        brandGrid.appendChild(btn);
    }
    
    document.getElementById('brandTitle').textContent = `🏷️ Select Brand for ${cat.name}`;
    goToStep(2);
}

function selectBrand(brandId, brandName) {
    wizardState.brand = brandId;
    wizardState.brandName = brandId === 'all' ? '' : brandName;
    
    updateProgress(3);
    
    const cat = CATEGORIES[wizardState.category];
    const priceGrid = document.getElementById('priceGrid');
    priceGrid.innerHTML = '';
    
    for (const [label, min, max] of cat.prices) {
        const btn = document.createElement('button');
        btn.className = 'price-btn';
        btn.textContent = label;
        btn.onclick = () => selectPrice(min, max);
        priceGrid.appendChild(btn);
    }
    
    goToStep(3);
}

function selectPrice(min, max) {
    wizardState.priceMin = min;
    wizardState.priceMax = max;
    
    updateProgress(4);
    
    const cat = CATEGORIES[wizardState.category];
    const discountGrid = document.getElementById('discountGrid');
    discountGrid.innerHTML = '';
    
    for (const [label, discount] of cat.discounts) {
        const btn = document.createElement('button');
        btn.className = 'discount-btn';
        btn.textContent = `🏷️ ${label} Off`;
        btn.onclick = () => {
            wizardState.discount = discount;
            showResult();
        };
        discountGrid.appendChild(btn);
    }
    
    goToStep(4);
}

async function showResult() {
    const cat = CATEGORIES[wizardState.category];
    const store = cat.store;
    
    // Show loading state
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById('wizardResult').classList.add('active');
    
    const summary = document.getElementById('resultSummary');
    summary.innerHTML = '<p style="text-align:center;">⏳ Generating your personalized link...</p>';
    
    // Generate the link via API (with fallback)
    const link = await generateDirectLink(store, cat.search, {
        brand: wizardState.brandName,
        price_min: wizardState.priceMin,
        price_max: wizardState.priceMax,
        discount: wizardState.discount
    });
    
    wizardState.generatedUrl = link || generateFallbackUrl(store, cat.search, {
        brand: wizardState.brandName,
        price_min: wizardState.priceMin,
        price_max: wizardState.priceMax,
        discount: wizardState.discount
    });
    
    // Build summary
    let html = `<p><span>📦 Category:</span> ${cat.name}</p>`;
    if (wizardState.brandName) {
        html += `<p><span>🏷️ Brand:</span> ${wizardState.brandName}</p>`;
    }
    if (wizardState.priceMax < 999999) {
        html += `<p><span>💰 Price:</span> ₹${wizardState.priceMin.toLocaleString()} - ₹${wizardState.priceMax.toLocaleString()}</p>`;
    }
    if (wizardState.discount > 0) {
        html += `<p><span>🏷️ Discount:</span> ${wizardState.discount}%+ off</p>`;
    }
    html += `<p><span>🏪 Store:</span> <span class="store-name">${store.charAt(0).toUpperCase() + store.slice(1)}</span></p>`;
    summary.innerHTML = html;
    
    // Update button
    document.getElementById('shopNowBtn').href = wizardState.generatedUrl;
    document.getElementById('shopNowIcon').textContent = STORE_ICONS[store] || '🛒';
    document.getElementById('shopNowStore').textContent = store.charAt(0).toUpperCase() + store.slice(1);
    
    // Update progress to completed
    document.querySelectorAll('.progress-step').forEach(s => s.classList.add('completed'));
}

function goToStep(step) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`wizardStep${step}`).classList.add('active');
}

function updateProgress(activeStep) {
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        if (stepNum < activeStep) step.classList.add('completed');
        if (stepNum === activeStep) step.classList.add('active');
    });
}

function resetWizard() {
    wizardState = {
        category: null,
        brand: null,
        brandName: '',
        priceMin: 0,
        priceMax: 999999,
        discount: 0,
        generatedUrl: ''
    };
    
    document.querySelectorAll('.progress-step').forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i === 0) s.classList.add('active');
    });
    
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById('wizardStep1').classList.add('active');
}

// Generate direct store link with filters (same as bot)
async function generateDirectLink(store, query, filters = {}) {
    try {
        const params = new URLSearchParams({
            store: store,
            query: query,
            brand: filters.brand || '',
            price_min: filters.price_min || 0,
            price_max: filters.price_max || 999999,
            discount: filters.discount || 0,
            color: filters.color || ''
        });
        
        const response = await fetch(`${API_BASE}/generate-link?${params.toString()}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        if (data.success && data.affiliate_url) {
            return data.affiliate_url;
        }
        // If API returns success but no affiliate URL, use original
        if (data.original_url) {
            return data.original_url;
        }
        return null;
    } catch (error) {
        console.error('Link generation error:', error);
        // Fallback: Generate URL locally
        return generateFallbackUrl(store, query, filters);
    }
}

// Fallback URL generation when API fails
function generateFallbackUrl(store, query, filters = {}) {
    const { brand, price_min, price_max, discount } = filters;
    
    if (store === 'myntra') {
        let url = `https://www.myntra.com/${query.replace(/ /g, '-')}`;
        const params = [];
        if (brand) params.push(`f=Brand%3A${encodeURIComponent(brand)}`);
        if (price_max < 999999) params.push(`price=${price_min || 0}%2C${price_max}`);
        if (discount) params.push(`discount=${discount}%3A100`);
        params.push('sort=popularity');
        if (params.length) url += '?' + params.join('&');
        return url;
    } else {
        // Flipkart
        let searchTerms = brand ? `${brand} ${query}` : query;
        let url = `https://www.flipkart.com/search?q=${encodeURIComponent(searchTerms)}`;
        if (price_max < 999999) {
            url += `&p%5B%5D=facets.price_range.from%3D${price_min || 0}`;
            url += `&p%5B%5D=facets.price_range.to%3D${price_max}`;
        }
        if (discount) {
            url += `&p%5B%5D=facets.discount_range%5B%5D%3D${discount}%25+or+more`;
        }
        url += '&sort=popularity';
        return url;
    }
}

// Direct product links - use affiliate URL from product data
function getProductUrl(originalUrl) {
    return originalUrl;
}

// ===== Prevent duplicate API calls =====
let isLoadingDeals = false;
let isLoadingDealOfDay = false;
let dealsLoaded = false;
let dealOfDayLoaded = false;

// ===== Deal of the Day Functions =====
let dealOfDayTimer = null;

async function loadDealOfDay() {
    const dealSection = document.getElementById('dealOfDay');
    if (!dealSection) return;
    
    // Prevent duplicate calls
    if (isLoadingDealOfDay || dealOfDayLoaded) return;
    
    // Show only for logged-in users
    if (!currentUser) {
        dealSection.style.display = 'none';
        return;
    }
    
    isLoadingDealOfDay = true;
    dealSection.style.display = 'block';
    
    try {
        const response = await fetch(`${API_BASE}/deals?limit=5&min_discount=60`);
        if (!response.ok) throw new Error('Failed to fetch deals');
        
        const data = await response.json();
        if (data.deals && data.deals.length > 0) {
            // Pick a random hot deal
            const randomDeal = data.deals[Math.floor(Math.random() * data.deals.length)];
            displayDealOfDay(randomDeal);
            dealOfDayLoaded = true;
        }
    } catch (error) {
        console.log('Could not load deal of day:', error);
        dealSection.style.display = 'none';
    } finally {
        isLoadingDealOfDay = false;
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
                    <a href="${getProductUrl(deal.affiliate_url)}" target="_blank" class="deal-buy-btn">
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
            const timerEl = document.getElementById('dealTimer');
            if (timerEl) timerEl.textContent = 'Deal Ended!';
            clearInterval(dealOfDayTimer); // Stop timer, don't reload
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
    btn.addEventListener("click", async () => {
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
        
        // For quick buttons with specific filters, offer direct link
        if (btn.classList.contains("active") && filterType === "discount" && filterValue >= 50) {
            // Show direct link for hot deals
            const store = platformInput.value || 'Flipkart';
            const query = categoryInput.value || 'all';
            
            showSuccess(`🔥 Generating ${filterValue}%+ off deals...`);
            
            const link = await generateDirectLink(store.toLowerCase(), query, {
                discount: parseInt(filterValue)
            });
            
            if (link) {
                // Ask user if they want direct link or search results
                const useDirectLink = confirm(`Found ${filterValue}%+ off deals!\n\nClick OK to browse directly on ${store}, or Cancel to see results here.`);
                if (useDirectLink) {
                    window.open(link, '_blank');
                    btn.classList.remove("active");
                    return;
                }
            }
        }
        
        searchProducts();
    });
});

document.querySelectorAll(".filter-group input").forEach(input => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchProducts();
    });
});

// ===== Intelligent Brand Filtering =====
// Brand options based on category
const brandsByCategory = {
    "Smartphones": ["All Brands", "Samsung", "Realme", "Xiaomi", "OnePlus", "Vivo", "Apple", "Oppo", "Motorola", "iQOO", "Poco"],
    "Laptops": ["All Brands", "HP", "Lenovo", "Dell", "Asus", "Acer", "Apple", "MSI"],
    "Earphones": ["All Brands", "boAt", "JBL", "Noise", "Sony", "Realme", "OnePlus", "Samsung"],
    "Shoes": ["All Brands", "Puma", "Nike", "Adidas", "Reebok", "Campus", "Sparx", "Bata"],
    "Watches": ["All Brands", "Noise", "boAt", "Fire-Boltt", "Fastrack", "Titan", "Fossil"],
    "Clothing": ["All Brands", "Roadster", "H&M", "Allen Solly", "Van Heusen", "Peter England", "Wrogn", "Mast & Harbour"]
};

// Update brand dropdown when category changes
function updateBrandDropdown(category) {
    const brandSelect = document.getElementById('brand');
    if (!brandSelect) return;
    
    // Clear existing options
    brandSelect.innerHTML = '<option value="">All Brands</option>';
    
    if (category && brandsByCategory[category]) {
        brandsByCategory[category].forEach(brand => {
            if (brand !== "All Brands") {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            }
        });
    } else {
        // If no category selected, show all brands
        const allBrands = new Set();
        Object.values(brandsByCategory).forEach(brands => {
            brands.forEach(brand => {
                if (brand !== "All Brands") allBrands.add(brand);
            });
        });
        Array.from(allBrands).sort().forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
}

// Listen to category changes
if (categoryInput) {
    categoryInput.addEventListener('change', () => {
        updateBrandDropdown(categoryInput.value);
    });
}

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
        
        // Always show direct link option when platform is selected
        const filters = {
            platform: platform || 'Flipkart',
            query: searchQuery || category || 'deals',
            category: category,
            brand: brand,
            price_min: parseInt(minPrice) || 0,
            price_max: parseInt(maxPrice) || 999999,
            discount: parseInt(minDiscount) || 0
        };
        
        // Always use displayProductsWithDirectLink when platform or search is specified
        if (platform || searchQuery || category) {
            displayProductsWithDirectLink(data, filters);
        } else {
            displayProducts(data);
        }
    } catch (error) {
        console.error("Search error:", error);
        showError("Failed to fetch products. Please try again.");
        hideLoading();
    }
}

// ===== Display Products with Direct Link Option =====
function displayProductsWithDirectLink(data, filters) {
    hideLoading();
    initialState.style.display = "none";

    // Always show direct link banner - even with no results
    const storeName = filters.platform || 'Store';
    const directLinkHtml = `
        <div class="direct-store-link-card" id="directStoreLinkCard">
            <div class="store-link-glow"></div>
            <div class="store-link-content">
                <div class="store-link-icon">${getStoreEmoji(storeName)}</div>
                <div class="store-link-info">
                    <h4>🔗 Browse on ${storeName}</h4>
                    <p>Click to open ${storeName} with your filters applied</p>
                    <div class="store-link-filters">
                        ${filters.query ? `<span class="filter-tag">🔍 ${filters.query}</span>` : ''}
                        ${filters.brand ? `<span class="filter-tag">🏷️ ${filters.brand}</span>` : ''}
                        ${filters.price_max < 999999 ? `<span class="filter-tag">💰 Under ₹${filters.price_max}</span>` : ''}
                        ${filters.discount > 0 ? `<span class="filter-tag">🔥 ${filters.discount}%+ off</span>` : ''}
                    </div>
                </div>
                <button class="store-link-btn" id="directLinkBtn">
                    <span class="btn-text">Open ${storeName}</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>
        </div>
    `;

    if (data.count === 0) {
        productsGrid.innerHTML = "";
        resultsHeader.style.display = "block";
        resultsCount.innerHTML = `<span style="color: var(--text-secondary);">No products in our database</span>`;
        noResults.style.display = "block";
        noResults.innerHTML = `
            <div class="no-results-icon">🛒</div>
            <h3>No products found in our catalog</h3>
            <p style="margin-bottom: 20px;">But you can browse directly on ${storeName}!</p>
            ${directLinkHtml}
        `;
        attachDirectLinkHandler(filters);
        return;
    }

    noResults.style.display = "none";
    resultsHeader.style.display = "block";
    resultsCount.innerHTML = `Found ${data.count} products`;
    
    // Add direct link card before products
    productsGrid.innerHTML = directLinkHtml + data.products.map(product => createProductCard(product)).join("");
    attachDirectLinkHandler(filters);
}

// Get store emoji
function getStoreEmoji(store) {
    const emojis = {
        'Flipkart': '🛒',
        'flipkart': '🛒',
        'Myntra': '👗',
        'myntra': '👗',
        'Ajio': '🎯',
        'ajio': '🎯'
    };
    return emojis[store] || '🛍️';
}

// Attach click handler for direct link button
function attachDirectLinkHandler(filters) {
    const directLinkBtn = document.getElementById('directLinkBtn');
    if (directLinkBtn) {
        directLinkBtn.addEventListener('click', async () => {
            directLinkBtn.disabled = true;
            directLinkBtn.querySelector('.btn-text').textContent = '⏳ Generating...';
            
            const store = (filters.platform || 'flipkart').toLowerCase();
            const query = filters.query || filters.category || 'deals';
            
            const link = await generateDirectLink(store, query, {
                brand: filters.brand,
                price_min: filters.price_min,
                price_max: filters.price_max,
                discount: filters.discount
            });
            
            if (link) {
                // Show the link before opening
                showGeneratedLinkPopup(link, filters.platform || 'Store', query);
                window.open(link, '_blank');
                directLinkBtn.querySelector('.btn-text').textContent = '✅ Opened!';
                setTimeout(() => {
                    directLinkBtn.disabled = false;
                    directLinkBtn.querySelector('.btn-text').textContent = `Open ${filters.platform || 'Store'}`;
                }, 2000);
            } else {
                directLinkBtn.disabled = false;
                directLinkBtn.querySelector('.btn-text').textContent = '❌ Failed';
                setTimeout(() => {
                    directLinkBtn.querySelector('.btn-text').textContent = `Open ${filters.platform || 'Store'}`;
                }, 2000);
            }
        });
    }
}

// Show popup with generated link for sharing
function showGeneratedLinkPopup(link, store, query) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.link-popup-overlay');
    if (existingPopup) existingPopup.remove();
    
    const popup = document.createElement('div');
    popup.className = 'link-popup-overlay';
    popup.innerHTML = `
        <div class="link-popup glass">
            <button class="link-popup-close">&times;</button>
            <div class="link-popup-header">
                <span class="link-popup-icon">${getStoreEmoji(store)}</span>
                <h3>Your Link is Ready!</h3>
            </div>
            <div class="link-popup-preview">
                <strong>${query} on ${store}</strong>
                <p class="link-url">${link.substring(0, 50)}...</p>
            </div>
            <div class="link-popup-actions">
                <button class="link-popup-btn copy" id="popupCopyBtn">
                    📋 Copy Link
                </button>
                <button class="link-popup-btn share" id="popupShareBtn">
                    📤 Share
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close handlers
    popup.querySelector('.link-popup-close').onclick = () => popup.remove();
    popup.onclick = (e) => { if (e.target === popup) popup.remove(); };
    
    // Copy button
    popup.querySelector('#popupCopyBtn').onclick = async () => {
        try {
            await navigator.clipboard.writeText(link);
            popup.querySelector('#popupCopyBtn').textContent = '✅ Copied!';
            showSuccess('Link copied to clipboard!');
        } catch (e) {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = link;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            popup.querySelector('#popupCopyBtn').textContent = '✅ Copied!';
        }
    };
    
    // Share button
    popup.querySelector('#popupShareBtn').onclick = async () => {
        const shareText = `🛍️ Check out ${query} on ${store}!\n\n🔗 ${link}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: `${query} on ${store}`, url: link });
            } catch (e) {}
        } else {
            // Copy for sharing
            await navigator.clipboard.writeText(shareText);
            popup.querySelector('#popupShareBtn').textContent = '✅ Copied!';
            showSuccess('Share text copied!');
        }
    };
    
    // Auto close after 10 seconds
    setTimeout(() => popup.remove(), 10000);
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
                <a href="${getProductUrl(product.affiliate_url)}" target="_blank" rel="noopener noreferrer" class="buy-btn">
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
    // Prevent duplicate calls
    if (isLoadingDeals) return;
    
    isLoadingDeals = true;
    
    try {
        const response = await fetch(`${API_BASE}/deals?limit=8`);
        if (response.ok) {
            const data = await response.json();
            if (data.deals && data.deals.length > 0) {
                initialState.style.display = "none";
                resultsHeader.style.display = "block";
                resultsCount.textContent = "🔥 Top Deals for You";
                productsGrid.innerHTML = data.deals.map(product => createProductCard(product)).join("");
                dealsLoaded = true;
            }
        } else {
            initialState.style.display = "block";
        }
    } catch (error) {
        console.error("Could not load top deals:", error);
        initialState.style.display = "block";
    } finally {
        isLoadingDeals = false;
    }
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
        // ===== Smart Suggestions for Hero Search =====
        const SUGGESTIONS = {
            smartphones: [
                { name: "Samsung Galaxy S24 Ultra", icon: "📱", tag: "Flagship" },
                { name: "iPhone 15 Pro Max", icon: "🍎", tag: "Premium" },
                { name: "OnePlus 12", icon: "🔴", tag: "Performance" },
                { name: "Realme Narzo 70 Pro", icon: "🟡", tag: "Budget" },
                { name: "Vivo V30 Pro", icon: "🟣", tag: "Camera" },
                { name: "Nothing Phone 2", icon: "⚫", tag: "Unique" },
                { name: "Google Pixel 8 Pro", icon: "🔵", tag: "AI" },
                { name: "Xiaomi 14 Pro", icon: "🟠", tag: "Value" }
            ],
            laptops: [
                { name: "HP Pavilion Gaming", icon: "💻", tag: "Gaming" },
                { name: "Dell XPS 15", icon: "🟦", tag: "Premium" },
                { name: "MacBook Air M3", icon: "🍏", tag: "Lightweight" },
                { name: "Lenovo Legion 5 Pro", icon: "🟩", tag: "Gaming" },
                { name: "ASUS VivoBook S15", icon: "🟧", tag: "Everyday" },
                { name: "Acer Aspire 5", icon: "🟢", tag: "Budget" },
                { name: "MSI Katana 15", icon: "🔴", tag: "Gaming" }
            ],
            shoes: [
                { name: "Nike Air Max 270", icon: "👟", tag: "Sporty" },
                { name: "Adidas Ultraboost 22", icon: "👟", tag: "Running" },
                { name: "Puma RS-X", icon: "👟", tag: "Lifestyle" },
                { name: "Campus Sutra", icon: "👟", tag: "Budget" },
                { name: "New Balance 574", icon: "👟", tag: "Classic" },
                { name: "Reebok Zig Kinetica", icon: "👟", tag: "Trendy" }
            ],
            earphones: [
                { name: "boAt Airdopes 141", icon: "🎧", tag: "Budget" },
                { name: "Sony WF-1000XM5", icon: "🎧", tag: "Premium" },
                { name: "JBL Tune 230NC TWS", icon: "🎧", tag: "ANC" },
                { name: "OnePlus Buds Pro 2", icon: "🎧", tag: "Quality" },
                { name: "Noise Buds VS404", icon: "🎧", tag: "Value" },
                { name: "Apple AirPods Pro", icon: "🎧", tag: "Apple" }
            ],
            watches: [
                { name: "Fire-Boltt Phoenix Ultra", icon: "⌚", tag: "Budget" },
                { name: "Noise ColorFit Pro 4", icon: "⌚", tag: "Features" },
                { name: "boAt Wave Call 2", icon: "⌚", tag: "Budget" },
                { name: "Apple Watch Series 9", icon: "⌚", tag: "Premium" },
                { name: "Samsung Galaxy Watch 6", icon: "⌚", tag: "Android" },
                { name: "Amazfit GTR 4", icon: "⌚", tag: "Fitness" }
            ],
            clothing: [
                { name: "Levis 511 Slim Fit", icon: "👖", tag: "Jeans" },
                { name: "H&M Cotton Shirt", icon: "👕", tag: "Casual" },
                { name: "Zara Summer Dress", icon: "👗", tag: "Women" },
                { name: "Roadster T-Shirt", icon: "👔", tag: "Men" },
                { name: "Allen Solly Formal", icon: "👔", tag: "Office" },
                { name: "Puma Track Pants", icon: "👖", tag: "Sports" }
            ]
        };

        // Create suggestion dropdown
        const suggestionBox = document.createElement('div');
        suggestionBox.id = 'heroSuggestionBox';
        suggestionBox.style.position = 'absolute';
        suggestionBox.style.top = '60px';
        suggestionBox.style.left = '0';
        suggestionBox.style.width = '100%';
        suggestionBox.style.zIndex = '100';
        suggestionBox.style.background = 'rgba(30, 30, 40, 0.98)';
        suggestionBox.style.borderRadius = '16px';
        suggestionBox.style.boxShadow = '0 8px 32px rgba(99,102,241,0.18)';
        suggestionBox.style.display = 'none';
        suggestionBox.style.padding = '12px 0';
        suggestionBox.style.maxHeight = '320px';
        suggestionBox.style.overflowY = 'auto';
        suggestionBox.style.fontSize = '16px';
        suggestionBox.style.color = '#fff';
        suggestionBox.style.backdropFilter = 'blur(8px)';
        suggestionBox.style.border = '1px solid rgba(99,102,241,0.18)';

        const heroSearchWrapper = document.querySelector('.hero-search');
        if (heroSearchWrapper) heroSearchWrapper.appendChild(suggestionBox);

        function showSuggestions(query) {
            let key = '';
            let categoryName = '';
            query = query.toLowerCase();
            
            // Enhanced keyword detection
            if (query.includes('smartphone') || query.includes('phone') || query.includes('mobile')) {
                key = 'smartphones';
                categoryName = '📱 Popular Smartphones';
            } else if (query.includes('laptop') || query.includes('notebook')) {
                key = 'laptops';
                categoryName = '💻 Top Laptops';
            } else if (query.includes('shoe') || query.includes('sneaker') || query.includes('footwear')) {
                key = 'shoes';
                categoryName = '👟 Trending Shoes';
            } else if (query.includes('earphone') || query.includes('headphone') || query.includes('earbud') || query.includes('audio')) {
                key = 'earphones';
                categoryName = '🎧 Best Audio Gear';
            } else if (query.includes('watch') || query.includes('smartwatch')) {
                key = 'watches';
                categoryName = '⌚ Smartwatches';
            } else if (query.includes('cloth') || query.includes('shirt') || query.includes('jeans') || query.includes('dress') || query.includes('tshirt') || query.includes('pant')) {
                key = 'clothing';
                categoryName = '👕 Fashion Picks';
            }

            if (key && SUGGESTIONS[key]) {
                const header = `<div style="padding:16px 24px 12px;font-size:13px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:1px;">${categoryName}</div>`;
                const items = SUGGESTIONS[key].map(s =>
                    `<div class="suggestion-item" style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 24px;cursor:pointer;transition:all 0.2s;border-bottom:1px solid rgba(99,102,241,0.06);" onmouseover="this.style.background='rgba(99,102,241,0.12)';this.style.transform='translateX(4px)';" onmouseout="this.style.background='none';this.style.transform='translateX(0)';">
                        <div style="display:flex;align-items:center;gap:14px;flex:1;">
                            <span style="font-size:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${s.icon}</span>
                            <span style="font-weight:600;font-size:15px;color:var(--text-primary);">${s.name}</span>
                        </div>
                        <span style="font-size:11px;padding:4px 10px;background:rgba(99,102,241,0.15);color:var(--accent-light);border-radius:12px;font-weight:600;">${s.tag}</span>
                    </div>`
                ).join('');
                suggestionBox.innerHTML = header + items;
                suggestionBox.style.display = 'block';
            } else {
                suggestionBox.style.display = 'none';
            }
        }

    // Hero Search functionality (declared early for suggestions)
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const heroSearch = document.getElementById('heroSearch');
    
        if (heroSearch) {
            heroSearch.addEventListener('input', (e) => {
                const val = heroSearch.value.trim();
                if (val.length > 2) {
                    showSuggestions(val);
                } else {
                    suggestionBox.style.display = 'none';
                }
            });

            suggestionBox.addEventListener('mousedown', (e) => {
                if (e.target.closest('.suggestion-item')) {
                    const text = e.target.closest('.suggestion-item').innerText;
                    heroSearch.value = text;
                    suggestionBox.style.display = 'none';
                }
            });

            document.addEventListener('click', (e) => {
                if (!heroSearchWrapper.contains(e.target)) {
                    suggestionBox.style.display = 'none';
                }
            });
        }
    // Initialize brand dropdown with all brands
    updateBrandDropdown('');
    
    loadTopDeals();
    
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', async () => {
            const query = heroSearch?.value.trim() || '';
            if (!query) {
                showError('Please enter a search term');
                return;
            }
            
            // Smart detection like bot
            const searchLower = query.toLowerCase();
            let detectedStore = 'flipkart';
            let detectedCategory = '';
            
            // Detect fashion items -> Myntra
            if (searchLower.match(/dress|kurti|saree|shirt|tshirt|jeans|shoes|heels|sandals/)) {
                detectedStore = 'myntra';
                if (searchLower.includes('dress')) detectedCategory = 'women-dresses';
                else if (searchLower.includes('kurti')) detectedCategory = 'kurtas-kurtis-suits';
                else if (searchLower.includes('saree')) detectedCategory = 'sarees';
                else if (searchLower.includes('shirt')) detectedCategory = 'men-shirts';
                else if (searchLower.includes('tshirt') || searchLower.includes('t-shirt')) detectedCategory = 'men-tshirts';
            }
            
            // Detect price in query
            let priceMin = 0;
            let priceMax = 999999;
            const underMatch = searchLower.match(/under\s*₹?\s*(\d+)/);
            if (underMatch) {
                priceMax = parseInt(underMatch[1]);
            }
            const rangeMatch = searchLower.match(/(\d+)\s*[-–]\s*(\d+)/);
            if (rangeMatch) {
                priceMin = parseInt(rangeMatch[1]);
                priceMax = parseInt(rangeMatch[2]);
            }
            
            // Generate direct link
            const link = await generateDirectLink(detectedStore, detectedCategory || query, {
                price_min: priceMin,
                price_max: priceMax
            });
            
            if (link) {
                window.open(link, '_blank');
                showSuccess(`🎯 Opening ${detectedStore.toUpperCase()} with your filters!`);
            } else {
                // Fallback to search
                const searchQuery = document.getElementById('searchQuery');
                if (searchQuery) searchQuery.value = query;
                searchProducts();
                document.querySelector('.filters-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (heroSearch) {
        heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = heroSearch.value.trim();
                const searchQuery = document.getElementById('searchQuery');
                if (searchQuery) searchQuery.value = query;
                searchProducts();
                document.querySelector('.filters-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            searchProducts();
        });
    }
    
    // Filters toggle
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersGrid = document.getElementById('filtersGrid');
    if (filtersToggle && filtersGrid) {
        filtersToggle.addEventListener('click', () => {
            filtersGrid.classList.toggle('active');
            filtersToggle.classList.toggle('active');
            const text = filtersToggle.querySelector('span');
            if (text) {
                text.textContent = filtersGrid.classList.contains('active') ? 'Hide Filters' : 'Show Filters';
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            if (mobileNav) mobileNav.classList.toggle('active');
        });
    }
    
    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const nav = link.dataset.nav;
            document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (nav === 'wishlist') {
                setActiveNav('wishlist');
                displayWishlist();
            } else if (nav === 'history') {
                setActiveNav('history');
                displaySearchHistory();
            } else {
                setActiveNav('deals');
                loadTopDeals();
            }
            
            // Close mobile menu
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (mobileNav) mobileNav.classList.remove('active');
        });
    });
    
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
    
    // Deals nav click
    document.getElementById('dealsNav')?.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav('deals');
        loadTopDeals();
    });
    
    // Auth state listener - only fires once per state change
    let lastAuthState = null;
    if (window.auth) {
        window.auth.onAuthStateChanged((user) => {
            // Prevent duplicate handling
            const currentState = user ? user.uid : null;
            if (currentState === lastAuthState) return;
            lastAuthState = currentState;
            
            currentUser = user;
            updateAuthUI(user);
            if (user) {
                loadWishlist();
                loadDealOfDay();
            } else {
                userWishlist = [];
                updateWishlistCount();
                hideDealOfDay();
                // Reset loaded flags on logout
                dealOfDayLoaded = false;
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

// ===== Direct Store Link Generator (Like Telegram Bot) =====

// Store icons and display names
const storeConfig = {
    flipkart: { icon: '🛒', name: 'Flipkart', domain: 'flipkart.com', color: '#2874f0' },
    myntra: { icon: '👗', name: 'Myntra', domain: 'myntra.com', color: '#ff3f6c' },
    ajio: { icon: '🎯', name: 'Ajio', domain: 'ajio.com', color: '#3d3d3d' }
};

// Initialize link generator
function initLinkGenerator() {
    const generateBtn = document.getElementById('generateLinkBtn');
    const copyBtn = document.getElementById('copyLinkBtn');
    const shareBtn = document.getElementById('shareLinkBtn');
    const linkCard = document.getElementById('generatedLinkCard');
    const linkPreview = document.querySelector('.link-card-preview');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerateLink);
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', handleCopyLink);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareLink);
    }
    
    // Click on preview to open link
    if (linkPreview) {
        linkPreview.addEventListener('click', () => {
            const openBtn = document.getElementById('openLinkBtn');
            if (openBtn) window.open(openBtn.href, '_blank');
        });
    }
    
    // Enter key on query input
    const queryInput = document.getElementById('linkQuery');
    if (queryInput) {
        queryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleGenerateLink();
        });
    }
}

// Generate link handler
async function handleGenerateLink() {
    const generateBtn = document.getElementById('generateLinkBtn');
    const linkCard = document.getElementById('generatedLinkCard');
    
    // Get values
    const store = document.getElementById('linkStore')?.value || 'flipkart';
    const query = document.getElementById('linkQuery')?.value.trim();
    const brand = document.getElementById('linkBrand')?.value.trim() || '';
    const minPrice = parseInt(document.getElementById('linkMinPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('linkMaxPrice')?.value) || 999999;
    const discount = parseInt(document.getElementById('linkDiscount')?.value) || 0;
    
    // Validation
    if (!query) {
        showError('Please enter what you\'re looking for!');
        document.getElementById('linkQuery')?.focus();
        return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> <span>Generating...</span>';
    
    try {
        const link = await generateDirectLink(store, query, {
            brand: brand,
            price_min: minPrice,
            price_max: maxPrice,
            discount: discount
        });
        
        if (link) {
            // Show the link card
            displayGeneratedLink(store, query, brand, minPrice, maxPrice, discount, link);
            showSuccess('🔗 Link generated successfully!');
        } else {
            showError('Failed to generate link. Try again!');
        }
    } catch (error) {
        console.error('Link generation error:', error);
        showError('Something went wrong. Please try again.');
    } finally {
        // Reset button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> <span>Generate Link</span>';
    }
}

// Display the generated link in attractive card
function displayGeneratedLink(store, query, brand, minPrice, maxPrice, discount, link) {
    const linkCard = document.getElementById('generatedLinkCard');
    const config = storeConfig[store];
    
    // Build title
    let title = `${query.charAt(0).toUpperCase() + query.slice(1)}`;
    if (brand) title += ` by ${brand}`;
    title += ` on ${config.name}`;
    
    // Build description with filters
    let desc = '🛍️ ';
    const filters = [];
    if (discount > 0) filters.push(`${discount}%+ off`);
    if (minPrice > 0 && maxPrice < 999999) filters.push(`₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`);
    else if (minPrice > 0) filters.push(`Min ₹${minPrice.toLocaleString()}`);
    else if (maxPrice < 999999) filters.push(`Under ₹${maxPrice.toLocaleString()}`);
    
    desc += filters.length > 0 ? filters.join(' • ') : 'All best deals with filters applied';
    
    // Display short URL
    const shortUrl = link.length > 60 ? link.substring(0, 57) + '...' : link;
    
    // Update card
    document.getElementById('linkPreviewIcon').textContent = config.icon;
    document.getElementById('linkPreviewTitle').textContent = title;
    document.getElementById('linkPreviewDesc').textContent = desc;
    document.getElementById('linkPreviewUrl').textContent = shortUrl;
    document.getElementById('openLinkBtn').href = link;
    document.getElementById('generatedLinkUrl').value = link;
    
    // Show card with animation
    linkCard.style.display = 'block';
    linkCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy link to clipboard
async function handleCopyLink() {
    const link = document.getElementById('generatedLinkUrl')?.value;
    const copyBtn = document.getElementById('copyLinkBtn');
    
    if (!link) {
        showError('No link to copy!');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(link);
        
        // Visual feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> <span>Copied!</span>';
        showSuccess('📋 Link copied to clipboard!');
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> <span>Copy Link</span>';
        }, 2000);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccess('📋 Link copied!');
    }
}

// Share link (Web Share API or fallback)
async function handleShareLink() {
    const link = document.getElementById('generatedLinkUrl')?.value;
    const title = document.getElementById('linkPreviewTitle')?.textContent || 'Check out this deal!';
    const query = document.getElementById('linkQuery')?.value || 'products';
    
    if (!link) {
        showError('No link to share!');
        return;
    }
    
    const shareText = `🛍️ ${title}\n\n💰 Best deals with filters applied!\n\n🔗 Shop now: ${link}\n\n📱 Found via SmartDeals - Your Smart Shopping Companion`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: `🛍️ Check out ${query} deals!`,
                url: link
            });
            showSuccess('Shared successfully! 🎉');
        } catch (error) {
            if (error.name !== 'AbortError') {
                // User cancelled share, try copy fallback
                handleCopyLink();
            }
        }
    } else {
        // Fallback: Open share options popup
        openSharePopup(link, title, shareText);
    }
}

// Share popup for desktop/unsupported browsers
function openSharePopup(link, title, shareText) {
    const encodedUrl = encodeURIComponent(link);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(shareText);
    
    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content glass">
            <div class="share-modal-header">
                <h3>📤 Share This Deal</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-options">
                <a href="https://wa.me/?text=${encodedText}" target="_blank" class="share-option whatsapp">
                    <span class="share-icon">💬</span>
                    <span>WhatsApp</span>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent('🛍️ ' + title + ' - Best deals!')}" target="_blank" class="share-option twitter">
                    <span class="share-icon">🐦</span>
                    <span>Twitter</span>
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" class="share-option linkedin">
                    <span class="share-icon">💼</span>
                    <span>LinkedIn</span>
                </a>
                <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" target="_blank" class="share-option telegram">
                    <span class="share-icon">✈️</span>
                    <span>Telegram</span>
                </a>
                <a href="mailto:?subject=${encodedTitle}&body=${encodedText}" class="share-option email">
                    <span class="share-icon">📧</span>
                    <span>Email</span>
                </a>
                <button class="share-option copy" onclick="handleCopyLink(); this.closest('.share-modal').remove();">
                    <span class="share-icon">📋</span>
                    <span>Copy Link</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close handlers
    modal.querySelector('.share-modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    // Add modal styles
    addShareModalStyles();
}

// Add share modal styles dynamically
function addShareModalStyles() {
    if (document.getElementById('share-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'share-modal-styles';
    style.textContent = `
        .share-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .share-modal-content { background: var(--bg-card); padding: 24px; border-radius: 16px; max-width: 400px; width: 90%; animation: slideUp 0.3s ease; }
        .share-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .share-modal-header h3 { margin: 0; font-size: 18px; color: var(--text-primary); }
        .share-modal-close { font-size: 28px; color: var(--text-muted); background: none; border: none; cursor: pointer; line-height: 1; }
        .share-modal-close:hover { color: var(--text-primary); }
        .share-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .share-option { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 12px; background: var(--bg-elevated); border-radius: 12px; color: var(--text-primary); font-size: 13px; font-weight: 500; text-decoration: none; transition: all 0.2s; border: none; cursor: pointer; }
        .share-option:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .share-icon { font-size: 24px; }
        .share-option.whatsapp:hover { background: #25D366; color: white; }
        .share-option.twitter:hover { background: #1DA1F2; color: white; }
        .share-option.linkedin:hover { background: #0077B5; color: white; }
        .share-option.telegram:hover { background: #0088cc; color: white; }
        .share-option.email:hover { background: var(--accent); color: white; }
        .share-option.copy:hover { background: var(--gradient-success); color: white; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
}

// Initialize link generator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initLinkGenerator();
    initCategoryWizard();
    
    // Add scroll animations for product cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards when they're added
    const productObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('product-card')) {
                    node.style.opacity = '0';
                    node.style.transform = 'translateY(30px)';
                    node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(node);
                }
            });
        });
    });
    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productObserver.observe(productsGrid, { childList: true });
    }
});
