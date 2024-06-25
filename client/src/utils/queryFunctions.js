// Fetch featured coffee shops based on location
export const fetchFeaturedCoffeeShops = async (latitude, longitude) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}?latitude=${latitude}&longitude=${longitude}&isFeatured=true`,
  );
  return response.json();
};

// Fetch all coffee shops with optional search and pagination
export const fetchAllCoffeeShops = async (latitude, longitude, page = 0, search) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    page,
    ...(search && { search }),
  });

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}?${params.toString()}`);
  return response.json();
};

// Get details of a specific coffee shop by ID
export const getCoffeeShopDetails = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/shop/${id}`);
  return response.json();
};

// Reverse geocode to get city name from coordinates
export const getCityName = async (latitude, longitude) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  );
  return response.json();
};
