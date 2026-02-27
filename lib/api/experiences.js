const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

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

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  } catch (err) {
    const msg =
      `Failed to reach API at ${API_BASE_URL}${endpoint}. ` +
      `Make sure the backend is running and NEXT_PUBLIC_API_URL is correct.`;
    throw new Error(msg);
  }
  
  if (!response.ok) {
    const payload = await response
      .json()
      .catch(() => ({ message: 'Request failed' }));

    const message =
      payload?.message ||
      payload?.error?.message ||
      payload?.error ||
      payload?.errors?.[0]?.message ||
      'Something went wrong';

    throw new Error(message);
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
  login: (emailOrUsername, password) =>
    apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ emailOrUsername, password }),
    }),
  
  register: (userData) =>
    apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),
  
  forgotPassword: (email) =>
    apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  
  getCurrentUser: () => apiFetch('/auth/me'),
};

// Profile API calls
export const profileAPI = {
  update: (profileData) =>
    apiFetch('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  uploadAvatar: (avatarUrl) =>
    apiFetch('/profile/upload-avatar', {
      method: 'POST',
      body: JSON.stringify({ avatarUrl }),
    }),

  uploadAvatarFile: ({ fileName, contentType, dataBase64 }) =>
    apiFetch('/profile/upload-avatar-file', {
      method: 'POST',
      body: JSON.stringify({ fileName, contentType, dataBase64 }),
    }),
};

export const statsAPI = {
  getMyStats: () => apiFetch('/stats/me'),
};

export const reviewsAPI = {
  list: ({ limit, experienceTag } = {}) => {
    const params = new URLSearchParams();
    if (limit !== undefined && limit !== null) params.set('limit', String(limit));
    if (experienceTag) params.set('experienceTag', String(experienceTag));
    const qs = params.toString();
    return apiFetch(`/reviews${qs ? `?${qs}` : ''}`);
  },

  getMine: () => apiFetch('/reviews/me'),

  create: ({ rating, experienceTag, reviewText }) =>
    apiFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify({ rating, experienceTag, reviewText }),
    }),
};