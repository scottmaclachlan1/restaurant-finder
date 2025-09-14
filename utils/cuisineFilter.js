// Helper function to filter restaurants by cuisine
function filterByCuisine(restaurants, cuisine) {
  const cuisineKeywords = {
    'italian': ['pizza', 'pasta', 'italian', 'pizzeria', 'trattoria', 'ristorante'],
    'chinese': ['chinese', 'china', 'dim sum', 'cantonese', 'szechuan'],
    'mexican': ['mexican', 'taco', 'burrito', 'mexico', 'mexicana', 'taqueria'],
    'japanese': ['japanese', 'sushi', 'ramen', 'japan', 'sashimi', 'tempura', 'yakitori'],
    'indian': ['indian', 'curry', 'india', 'tandoor', 'masala', 'biryani'],
    'thai': ['thai', 'thailand', 'pad thai', 'tom yum', 'green curry'],
    'american': ['american', 'burger', 'grill', 'bbq', 'steakhouse', 'diner'],
    'french': ['french', 'bistro', 'france', 'brasserie', 'cafe'],
    'mediterranean': ['mediterranean', 'greek', 'lebanese', 'turkish', 'falafel'],
    'korean': ['korean', 'korea', 'bbq', 'kimchi', 'bulgogi'],
    'vietnamese': ['vietnamese', 'pho', 'vietnam', 'banh mi'],
    'greek': ['greek', 'gyro', 'greece', 'souvlaki', 'moussaka'],
    'spanish': ['spanish', 'tapas', 'spain', 'paella', 'sangria'],
    'german': ['german', 'bratwurst', 'germany', 'schnitzel', 'bier'],
    'brazilian': ['brazilian', 'churrascaria', 'brazil', 'rodizio'],
    'middle_eastern': ['middle eastern', 'arabic', 'persian', 'turkish', 'lebanese'],
    'seafood': ['seafood', 'fish', 'oyster', 'lobster', 'crab', 'shrimp'],
    'steakhouse': ['steak', 'steakhouse', 'prime', 'ribeye'],
    'pizza': ['pizza', 'pizzeria', 'pie'],
    'sushi': ['sushi', 'sashimi', 'roll', 'nigiri'],
    'vegetarian': ['vegetarian', 'veggie', 'plant-based'],
    'vegan': ['vegan', 'plant-based'],
    'fast_food': ['fast food', 'quick', 'drive', 'takeout'],
    'cafe': ['cafe', 'coffee', 'espresso', 'latte', 'cappuccino'],
    'bakery': ['bakery', 'bread', 'pastry', 'croissant', 'muffin'],
    'dessert': ['dessert', 'ice cream', 'sweet', 'gelato', 'cake', 'pie']
  };
  
  const keywords = cuisineKeywords[cuisine.toLowerCase()];
  if (!keywords) return restaurants;
  
  return restaurants.filter(restaurant => {
    const name = restaurant.name?.toLowerCase() || '';
    const types = restaurant.types || [];
    
    // Check restaurant name
    if (keywords.some(keyword => name.includes(keyword))) {
      return true;
    }
    
    // Check Google Places types
    if (types.some(type => keywords.some(keyword => type.toLowerCase().includes(keyword)))) {
      return true;
    }
    
    return false;
  });
}

module.exports = { filterByCuisine };
