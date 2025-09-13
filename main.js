const API_BASE_URL = 'http://192.168.1.184:3001';

function getLocationCachedOrNew() {
    const cache = JSON.parse(localStorage.getItem('cachedLocation') || '{}');
    const now = Date.now();
    if (cache.timestamp && now - cache.timestamp < 10 * 60 * 1000) {
      useLocation(cache.lat, cache.lng);
    } else {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        localStorage.setItem('cachedLocation', JSON.stringify({ lat, lng, timestamp: now }));
        useLocation(lat, lng);
      }, () => alert("Location access denied or unavailable."));
    }
  }

  async function useLocation(lat, lng) {
    const loading = document.getElementById('loading');
    const container = document.querySelector('.cards');
    
    // Show loading spinner
    loading.style.display = 'block';
    container.innerHTML = '';
    
    try {
      // Call backend API
      const response = await fetch(`${API_BASE_URL}/api/restaurants?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      
      // Hide loading spinner
      loading.style.display = 'none';
      
      if (data.results && data.results.length > 0) {
        displayCards(data.results);
        showMessage(`Found ${data.results.length} restaurants near you!`, 'success');
      } else {
        container.innerHTML = '<div class="error-message">No restaurants found in your area. Try expanding your search radius or checking a different location.</div>';
      }
    } catch (e) {
      console.error("Error fetching restaurants:", e);
      loading.style.display = 'none';
      container.innerHTML = '<div class="error-message">Unable to fetch restaurants. Please make sure the server is running and try again.</div>';
    }
  }

  function displayCards(restaurants) {
    const container = document.querySelector('.cards');
    container.innerHTML = '';
    restaurants.forEach((restaurant, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'swipe-wrapper';
      wrapper.style.zIndex = 200 - i;

      const card = document.createElement('div');
      card.className = 'location-card';

      const imgUrl = restaurant.photos?.[0]?.photo_reference
        ? `${API_BASE_URL}/api/photo?photoreference=${restaurant.photos[0].photo_reference}`
        : 'https://via.placeholder.com/250x150?text=No+Image';

      const restaurantData = {
        name: restaurant.name,
        place_id: restaurant.place_id,
        photo: imgUrl,
        rating: restaurant.rating || 'N/A'
      };

      card.innerHTML = `
        <img src="${imgUrl}" alt="${restaurant.name}" />
        <h3>${restaurant.name}</h3>
        <p>⭐️ Rating: ${restaurant.rating || 'N/A'}</p>
        <p><small>Swipe right to save 💖 or left to skip</small></p>
      `;

      // Add swipe indicators
      const leftIndicator = document.createElement('div');
      leftIndicator.className = 'swipe-indicator left';
      leftIndicator.innerHTML = '❌';
      
      const rightIndicator = document.createElement('div');
      rightIndicator.className = 'swipe-indicator right';
      rightIndicator.innerHTML = '💖';

      wrapper.appendChild(leftIndicator);
      wrapper.appendChild(rightIndicator);
      wrapper.appendChild(card);
      container.appendChild(wrapper);

      const hammertime = new Hammer(wrapper);
      
      // Add pan events for visual feedback
      hammertime.on('panstart', () => {
        wrapper.style.cursor = 'grabbing';
      });
      
      hammertime.on('panmove', (e) => {
        const deltaX = e.deltaX;
        if (Math.abs(deltaX) > 20) {
          if (deltaX > 0) {
            wrapper.classList.add('swiping-right');
            wrapper.classList.remove('swiping-left');
            rightIndicator.classList.add('show');
            leftIndicator.classList.remove('show');
          } else {
            wrapper.classList.add('swiping-left');
            wrapper.classList.remove('swiping-right');
            leftIndicator.classList.add('show');
            rightIndicator.classList.remove('show');
          }
        }
      });
      
      hammertime.on('panend', () => {
        wrapper.classList.remove('swiping-left', 'swiping-right');
        leftIndicator.classList.remove('show');
        rightIndicator.classList.remove('show');
        wrapper.style.cursor = 'grab';
      });

      hammertime.on('swipeleft', () => {
        wrapper.style.transform = 'translateX(-150%) rotate(-15deg)';
        wrapper.style.opacity = 0;
        showToast('Skipped!', 'info');
        setTimeout(() => wrapper.remove(), 300);
      });
      
      hammertime.on('swiperight', () => {
        saveRestaurant(JSON.stringify(restaurantData));
        wrapper.style.transform = 'translateX(150%) rotate(15deg)';
        wrapper.style.opacity = 0;
        setTimeout(() => wrapper.remove(), 300);
      });
    });
  }

  function saveRestaurant(restaurantJSON) {
    const restaurant = JSON.parse(restaurantJSON);
    let saved = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');
    if (!saved.find(r => r.place_id === restaurant.place_id)) {
      saved.push(restaurant);
      localStorage.setItem('savedRestaurants', JSON.stringify(saved));
      showToast(`💖 ${restaurant.name} saved!`, 'success');
    } else {
      showToast(`${restaurant.name} is already saved`, 'error');
    }
  }

  function showSaved() {
    const container = document.querySelector('.cards');
    container.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');
    if (saved.length === 0) {
      container.innerHTML = '<div class="error-message">No saved restaurants yet 😢<br>Start swiping right on restaurants you like to save them!</div>';
      return;
    }
    saved.forEach(restaurant => {
      const card = document.createElement('div');
      card.className = 'location-card';
      card.innerHTML = `
        <img src="${restaurant.photo}" alt="${restaurant.name}" />
        <h3>${restaurant.name}</h3>
        <p>⭐️ Rating: ${restaurant.rating}</p>
      `;
      container.appendChild(card);
    });
    showMessage(`Showing ${saved.length} saved restaurants`, 'success');
  }

  // Manual location input function
  function useManualLocation() {
    const lat = prompt("Enter latitude (e.g., 40.7128 for New York):");
    const lng = prompt("Enter longitude (e.g., -74.0060 for New York):");
    
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      // Validate coordinates
      if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        useLocation(latitude, longitude);
        showToast("Location set successfully!", 'success');
      } else {
        showToast("Invalid coordinates. Please enter valid latitude (-90 to 90) and longitude (-180 to 180).", 'error');
      }
    } else if (lat !== null && lng !== null) {
      showToast("Please enter valid numeric coordinates.", 'error');
    }
  }

  // Toast notification function
  function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function showMessage(message, type = 'info') {
    const container = document.querySelector('.cards');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }