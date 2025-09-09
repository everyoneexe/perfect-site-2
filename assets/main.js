// Luxury Theme Main JavaScript - HTML Demo Version
// Simplified version of the full Shopify theme functionality

console.log('🌟 Luxury Theme Demo Loaded');

// Global theme state
const LuxuryTheme = {
  cart: {
    items: [],
    count: 0
  },
  
  animations: {
    enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('✨ Initializing Luxury Theme Demo...');
  
  // Core initialization
  initializeTheme();
  
  console.log('🎉 Luxury Theme Demo Ready!');
});

function initializeTheme() {
  // Initialize all theme components
  initNavigation();
  initHeroEffects();
  initProductCards();
  initScrollEffects();
  initCart();
  initSearch();
  initNewsletterForm();
  
  // Remove loading state
  setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  }, 300);
}

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  // Scroll effect for navbar
  window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar?.classList.add('bg-white', 'shadow-lg');
      navbar?.classList.remove('bg-transparent');
    } else {
      navbar?.classList.remove('bg-white', 'shadow-lg');
      navbar?.classList.add('bg-transparent');
    }
  }, 16));
  
  // Mobile menu toggle (simplified)
  mobileToggle?.addEventListener('click', () => {
    showNotification('Mobile navigation would expand here in the full version', 'info');
  });
}

// Hero section effects
function initHeroEffects() {
  const hero = document.querySelector('.hero-3d');
  const heroContent = document.querySelector('.hero-content');
  
  if (!hero || !heroContent) return;
  
  // Parallax mouse movement effect
  hero.addEventListener('mousemove', throttle((e) => {
    if (!LuxuryTheme.animations.enabled) return;
    
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const maxMove = 15;
    heroContent.style.transform = `translate(${x * maxMove}px, ${y * maxMove}px)`;
  }, 16));
  
  // Reset position when mouse leaves
  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
  });
}

// Product card interactions
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Add to cart functionality
    const addToCartBtn = card.querySelector('.add-to-cart-quick');
    const productTitle = card.querySelector('.product-title')?.textContent;
    const productPrice = card.querySelector('.price')?.textContent;
    
    addToCartBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart({
        title: productTitle,
        price: productPrice,
        image: card.querySelector('img')?.src
      });
    });
    
    // Quick view functionality
    const quickViewBtn = card.querySelector('[title="Quick View"]');
    quickViewBtn?.addEventListener('click', () => {
      showNotification(`Quick view for ${productTitle} would open here`, 'info');
    });
    
    // Wishlist functionality
    const wishlistBtn = card.querySelector('[title="Add to Wishlist"]');
    wishlistBtn?.addEventListener('click', () => {
      showNotification(`${productTitle} added to wishlist!`, 'success');
    });
  });
}

// Scroll-triggered animations
function initScrollEffects() {
  if (!LuxuryTheme.animations.enabled) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe product cards and other animated elements
  document.querySelectorAll('.product-card, .section-header').forEach(el => {
    observer.observe(el);
  });
}

// Cart functionality
function initCart() {
  const cartToggle = document.querySelector('.cart-toggle');
  const cartCount = document.querySelector('.cart-count');
  
  cartToggle?.addEventListener('click', () => {
    if (LuxuryTheme.cart.count === 0) {
      showNotification('Your cart is empty', 'info');
    } else {
      showNotification(`Cart has ${LuxuryTheme.cart.count} items. Full cart would open here.`, 'info');
    }
  });
  
  // Update cart count display
  updateCartCount();
}

function addToCart(product) {
  LuxuryTheme.cart.items.push(product);
  LuxuryTheme.cart.count++;
  
  updateCartCount();
  showNotification(`${product.title} added to cart!`, 'success');
  
  // Add cart animation effect
  const cartIcon = document.querySelector('.cart-toggle');
  cartIcon?.classList.add('animate-pulse');
  setTimeout(() => {
    cartIcon?.classList.remove('animate-pulse');
  }, 1000);
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = LuxuryTheme.cart.count;
    
    if (LuxuryTheme.cart.count > 0) {
      cartCount.classList.add('bg-accent-coral');
    }
  }
}

// Search functionality
function initSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  
  searchToggle?.addEventListener('click', () => {
    showNotification('Search overlay would appear here in the full version', 'info');
  });
}

// Newsletter form
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput?.value;
    
    if (email && isValidEmail(email)) {
      showNotification('Thank you for subscribing!', 'success');
      emailInput.value = '';
    } else {
      showNotification('Please enter a valid email address', 'error');
    }
  });
}

// Currency selector functionality
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('currency-selector')) {
    const currency = e.target.value;
    showNotification(`Currency changed to ${currency}`, 'info');
    // In full version, this would update all prices
  }
});

// Utility functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  
  const typeClasses = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-black'
  };
  
  notification.className = `
    fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 
    transform translate-y-full opacity-0 transition-all duration-300 
    max-w-sm ${typeClasses[type] || typeClasses.info}
  `.trim();
  
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">${message}</span>
      <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
        ✕
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.remove('translate-y-full', 'opacity-0');
  }, 100);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 4000);
}

function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  
  e.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});

// Add CSS animation class for scroll effects
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    console.log('🌙 Page hidden - pausing animations');
  } else {
    // Resume animations when tab becomes visible
    console.log('☀️ Page visible - resuming animations');
  }
});

// Export for global access (demo purposes)
window.LuxuryTheme = LuxuryTheme;
window.showNotification = showNotification;

console.log('🎨 Luxury Theme JavaScript initialized successfully!');
