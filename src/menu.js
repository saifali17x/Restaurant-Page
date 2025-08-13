import Panini from "./assets/Panini.png";
import Salads from "./assets/Salads.png";
import Sandwiches from "./assets/Sandwiches.png";
import Savors from "./assets/Savors.png";
import Sides from "./assets/Sides.png";
import logo from "./assets/Sooubway.jpg";

const MenuPage = {
  init() {
    this.cacheDom();
    this.menuData = this.getMenuData();
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.render();
    this.addEventListeners();
  },

  cacheDom() {
    this.mainContent = document.querySelector("#content");
    this.logoContainer = document.querySelector("#logo");
  },

  getMenuData() {
    return [
      {
        name: "Panini",
        image: Panini,
        description: "Grilled to perfection with premium ingredients and melted cheese",
        price: "$8.99",
        category: "sandwiches",
        popular: true
      },
      {
        name: "Fresh Salads",
        image: Salads,
        description: "Crisp greens, fresh vegetables, and your choice of protein",
        price: "$7.99",
        category: "healthy",
        popular: false
      },
      {
        name: "Classic Sandwiches",
        image: Sandwiches,
        description: "Traditional favorites with our signature bread and fresh fillings",
        price: "$6.99",
        category: "sandwiches",
        popular: true
      },
      {
        name: "Savory Bites",
        image: Savors,
        description: "Small plates packed with big flavors and premium ingredients",
        price: "$5.99",
        category: "appetizers",
        popular: false
      },
      {
        name: "Side Dishes",
        image: Sides,
        description: "Perfect accompaniments to complete your meal experience",
        price: "$3.99",
        category: "sides",
        popular: false
      }
    ];
  },

  createEl(tag, className = null) {
    const el = document.createElement(tag);
    if (className) {
      className.split(" ").forEach((cls) => el.classList.add(cls));
    }
    return el;
  },

  addEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterMenu();
      });
    }

    // Category filtering
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        this.currentCategory = e.target.dataset.category;
        this.updateActiveCategory();
        this.filterMenu();
      });
    });

    // Menu item interactions
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.showMenuItemDetails(item);
      });
    });
  },

  updateActiveCategory() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
      filter.classList.remove('active');
      if (filter.dataset.category === this.currentCategory) {
        filter.classList.add('active');
      }
    });
  },

  filterMenu() {
    const filteredData = this.menuData.filter(item => {
      const matchesCategory = this.currentCategory === 'all' || item.category === this.currentCategory;
      const matchesSearch = item.name.toLowerCase().includes(this.searchQuery) || 
                           item.description.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    this.renderMenuGrid(filteredData);
  },

  showMenuItemDetails(itemElement) {
    const itemName = itemElement.querySelector('.menu-label').textContent;
    const itemData = this.menuData.find(item => item.name === itemName);
    
    if (itemData) {
      this.showModal(itemData);
    }
  },

  showModal(itemData) {
    const modal = this.createEl('div', 'menu-modal');
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-image">
          <img src="${itemData.image}" alt="${itemData.name}">
        </div>
        <div class="modal-info">
          <h3>${itemData.name}</h3>
          <p class="modal-description">${itemData.description}</p>
          <div class="modal-price">${itemData.price}</div>
          <button class="modal-order-btn">Order Now</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Add modal styles
    this.addModalStyles();
    
    // Event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => this.closeModal(modal));
    overlay.addEventListener('click', () => this.closeModal(modal));
    
    // Order button
    const orderBtn = modal.querySelector('.modal-order-btn');
    orderBtn.addEventListener('click', () => {
      this.showToast(`Added ${itemData.name} to cart!`);
    });
  },

  closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  },

  showToast(message) {
    const toast = this.createEl('div', 'toast');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-green);
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  },

  addModalStyles() {
    if (!document.getElementById('modal-styles')) {
      const style = document.createElement('style');
      style.id = 'modal-styles';
      style.textContent = `
        .menu-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          animation: fadeIn 0.3s ease-out;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        
        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: var(--radius-2xl);
          padding: var(--space-xl);
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-2xl);
        }
        
        .modal-close {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--gray-500);
          transition: color var(--transition-fast);
        }
        
        .modal-close:hover {
          color: var(--gray-700);
        }
        
        .modal-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-lg);
        }
        
        .modal-info h3 {
          color: var(--gray-900);
          margin-bottom: var(--space-md);
        }
        
        .modal-description {
          color: var(--gray-600);
          margin-bottom: var(--space-lg);
          line-height: 1.6;
        }
        
        .modal-price {
          background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
          color: white;
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-full);
          font-weight: 600;
          display: inline-block;
          margin-bottom: var(--space-lg);
        }
        
        .modal-order-btn {
          background: var(--secondary-yellow);
          color: var(--gray-900);
          border: none;
          padding: var(--space-md) var(--space-xl);
          border-radius: var(--radius-full);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        
        .modal-order-btn:hover {
          background: var(--secondary-yellow-dark);
          transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  },

  render() {
    // Clear previous content
    this.mainContent.innerHTML = "";
    this.logoContainer.innerHTML = "";

    // Create and append logo image
    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";
    this.logoContainer.appendChild(logoImg);

    // Menu layout
    const menuContainer = this.createEl("div", "menu-container");

    const heading = this.createEl("h1", "menu-heading");
    heading.textContent = "Our Delicious Menu";

    const subtitle = this.createEl("p", "menu-subtitle");
    subtitle.textContent = "Discover our carefully crafted selection of fresh ingredients and bold flavors. Every item is prepared with passion and quality in mind.";

    // Search bar
    const searchContainer = this.createEl("div", "menu-search");
    searchContainer.innerHTML = `
      <span class="search-icon">🔍</span>
      <input type="text" class="search-input" placeholder="Search for your favorite items...">
    `;

    // Category filters
    const categoriesContainer = this.createEl("div", "menu-categories");
    const categories = [
      { name: 'All Items', category: 'all' },
      { name: 'Sandwiches', category: 'sandwiches' },
      { name: 'Healthy Options', category: 'healthy' },
      { name: 'Appetizers', category: 'appetizers' },
      { name: 'Sides', category: 'sides' }
    ];

    categories.forEach(cat => {
      const filterBtn = this.createEl("button", "category-filter");
      filterBtn.textContent = cat.name;
      filterBtn.dataset.category = cat.category;
      if (cat.category === 'all') {
        filterBtn.classList.add('active');
      }
      categoriesContainer.appendChild(filterBtn);
    });

    const menuGrid = this.createEl("div", "menu-grid");

    menuContainer.appendChild(heading);
    menuContainer.appendChild(subtitle);
    menuContainer.appendChild(searchContainer);
    menuContainer.appendChild(categoriesContainer);
    menuContainer.appendChild(menuGrid);

    this.mainContent.appendChild(menuContainer);

    // Render initial menu
    this.renderMenuGrid(this.menuData);
  },

  renderMenuGrid(menuItems) {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    if (menuItems.length === 0) {
      const emptyState = this.createEl("div", "menu-empty");
      emptyState.innerHTML = `
        <div class="menu-empty-icon">🍽️</div>
        <h3>No items found</h3>
        <p>Try adjusting your search or category filter</p>
      `;
      menuGrid.appendChild(emptyState);
      return;
    }

    menuItems.forEach((item, index) => {
      const card = this.createEl("div", "menu-item");
      if (item.popular) {
        card.classList.add('popular');
      }

      const imgContainer = this.createEl("div", "menu-img-container");
      const img = new Image();
      img.src = item.image;
      img.alt = item.name;
      img.classList.add("menu-img");
      imgContainer.appendChild(img);

      const label = this.createEl("h3", "menu-label");
      label.textContent = item.name;

      const description = this.createEl("p", "menu-description");
      description.textContent = item.description;

      const price = this.createEl("div", "menu-price");
      price.textContent = item.price;

      const category = this.createEl("div", "menu-category");
      category.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);

      card.appendChild(imgContainer);
      card.appendChild(label);
      card.appendChild(description);
      card.appendChild(price);
      card.appendChild(category);

      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      menuGrid.appendChild(card);
    });

    // Re-add event listeners for new items
    this.addMenuItemListeners();
  },

  addMenuItemListeners() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.showMenuItemDetails(item);
      });
    });
  }
};

export default MenuPage;
