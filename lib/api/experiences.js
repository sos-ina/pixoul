const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token'); // or use your auth method
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
}

// Experience API calls
export const experiencesAPI = {
  // Get all experiences
  getAll: () => apiFetch('/experiences'),
  
  // Get single experience by slug
  getBySlug: (slug) => apiFetch(`/experiences/${slug}`),
  
  // Get experiences by category
  getByCategory: (category) => apiFetch(`/experiences?category=${category}`),
  
  // Check availability
  checkAvailability: (experienceId, date, timeSlot) => 
    apiFetch('/experiences/availability', {
      method: 'POST',
      body: JSON.stringify({ experienceId, date, timeSlot }),
    }),
};

// Cart API calls
export const cartAPI = {
  // Get user's cart (authenticated users)
  getCart: () => apiFetch('/cart'),
  
  // Add to cart
  addItem: (experienceId, quantity = 1) =>
    apiFetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ experienceId, quantity }),
    }),
  
  // Update quantity
  updateItem: (itemId, quantity) =>
    apiFetch(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),
  
  // Remove item
  removeItem: (itemId) =>
    apiFetch(`/cart/items/${itemId}`, {
      method: 'DELETE',
    }),
  
  // Clear cart
  clearCart: () =>
    apiFetch('/cart', {
      method: 'DELETE',
    }),
  
  // Sync guest cart with authenticated cart
  syncCart: (guestCartItems) =>
    apiFetch('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items: guestCartItems }),
    }),
};

// Booking API calls
export const bookingAPI = {
  // Create booking
  create: (bookingData) =>
    apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  
  // Get user's bookings
  getMyBookings: () => apiFetch('/bookings/me'),
  
  // Get booking by ID
  getById: (bookingId) => apiFetch(`/bookings/${bookingId}`),
  
  // Cancel booking
  cancel: (bookingId) =>
    apiFetch(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    }),
};

// Auth API calls
export const authAPI = {
  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (userData) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),
  
  getCurrentUser: () => apiFetch('/auth/me'),
};