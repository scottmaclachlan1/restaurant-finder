// Helper function to determine cuisine type from restaurant data
function determineCuisineType(restaurant) {
  const name = restaurant.name?.toLowerCase() || '';
  const types = restaurant.types || [];
  
  // Simple keyword-based cuisine detection
  const cuisineKeywords = {
    'Italian': ['pizza', 'pasta', 'italian', 'pizzeria'],
    'Chinese': ['chinese', 'china', 'dim sum'],
    'Mexican': ['mexican', 'taco', 'burrito', 'mexico'],
    'Japanese': ['japanese', 'sushi', 'ramen', 'japan'],
    'Indian': ['indian', 'curry', 'india'],
    'Thai': ['thai', 'thailand'],
    'American': ['american', 'burger', 'grill', 'bbq'],
    'French': ['french', 'bistro', 'france'],
    'Mediterranean': ['mediterranean', 'greek', 'lebanese'],
    'Korean': ['korean', 'korea'],
    'Vietnamese': ['vietnamese', 'pho', 'vietnam'],
    'Spanish': ['spanish', 'tapas', 'spain'],
    'German': ['german', 'bratwurst', 'germany'],
    'Brazilian': ['brazilian', 'churrascaria', 'brazil'],
    'Middle Eastern': ['middle eastern', 'arabic', 'persian', 'turkish'],
    'Seafood': ['seafood', 'fish', 'oyster', 'lobster'],
    'Steakhouse': ['steak', 'steakhouse'],
    'Pizza': ['pizza', 'pizzeria'],
    'Sushi': ['sushi', 'sashimi'],
    'Vegetarian': ['vegetarian', 'veggie'],
    'Vegan': ['vegan'],
    'Fast Food': ['fast food', 'quick', 'drive'],
    'Cafe': ['cafe', 'coffee', 'espresso'],
    'Bakery': ['bakery', 'bread', 'pastry'],
    'Dessert': ['dessert', 'ice cream', 'sweet', 'gelato']
  };
  
  // Check restaurant name for cuisine keywords
  for (const [cuisine, keywords] of Object.entries(cuisineKeywords)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return cuisine;
    }
  }
  
  // Check Google Places types
  if (types.includes('meal_takeaway') || types.includes('meal_delivery')) return 'Fast Food';
  if (types.includes('cafe')) return 'Cafe';
  if (types.includes('bakery')) return 'Bakery';
  
  return 'Other';
}

module.exports = { determineCuisineType };
