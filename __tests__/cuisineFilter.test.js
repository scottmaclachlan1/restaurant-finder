
const { filterByCuisine } = require('../utils/cuisineFilter');

describe('Cuisine Filter', () => {
  const sampleRestaurants = [
    { name: "Mario's Pizza", types: ["restaurant", "pizza_restaurant"] },
    { name: "Curry House", types: ["restaurant", "indian_restaurant"] },
    { name: "Sushi Palace", types: ["restaurant", "japanese_restaurant"] },
    { name: "Burger King", types: ["restaurant", "fast_food_restaurant"] },
    { name: "Taco Bell", types: ["restaurant", "mexican_restaurant"] },
    { name: "Starbucks", types: ["cafe", "coffee_shop"] },
    { name: "Generic Restaurant", types: ["restaurant"] }
  ];

  test('should filter Italian restaurants correctly', () => {
    const result = filterByCuisine(sampleRestaurants, 'italian');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Mario's Pizza");
  });

  test('should filter Indian restaurants correctly', () => {
    const result = filterByCuisine(sampleRestaurants, 'indian');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Curry House");
  });

  test('should filter Japanese restaurants correctly', () => {
    const result = filterByCuisine(sampleRestaurants, 'japanese');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Sushi Palace");
  });

  test('should filter Mexican restaurants correctly', () => {
    const result = filterByCuisine(sampleRestaurants, 'mexican');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Taco Bell");
  });

  test('should filter cafe restaurants correctly', () => {
    const result = filterByCuisine(sampleRestaurants, 'cafe');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Starbucks");
  });

  test('should return all restaurants when no cuisine specified', () => {
    const result = filterByCuisine(sampleRestaurants, '');
    expect(result).toHaveLength(sampleRestaurants.length);
  });

  test('should return all restaurants when invalid cuisine specified', () => {
    const result = filterByCuisine(sampleRestaurants, 'invalid_cuisine');
    expect(result).toHaveLength(sampleRestaurants.length);
  });

  test('should handle empty restaurant array', () => {
    const result = filterByCuisine([], 'italian');
    expect(result).toHaveLength(0);
  });

  test('should handle restaurants with missing name', () => {
    const restaurantsWithMissingName = [
      { name: null, types: ["restaurant"] },
      { name: undefined, types: ["restaurant"] },
      { name: "", types: ["restaurant"] }
    ];
    const result = filterByCuisine(restaurantsWithMissingName, 'italian');
    expect(result).toHaveLength(0);
  });

  test('should handle restaurants with missing types', () => {
    const restaurantsWithMissingTypes = [
      { name: "Mario's Pizza", types: null },
      { name: "Curry House", types: undefined },
      { name: "Sushi Palace", types: [] }
    ];
    const result = filterByCuisine(restaurantsWithMissingTypes, 'italian');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Mario's Pizza");
  });

  test('should be case insensitive', () => {
    const result1 = filterByCuisine(sampleRestaurants, 'ITALIAN');
    const result2 = filterByCuisine(sampleRestaurants, 'Italian');
    const result3 = filterByCuisine(sampleRestaurants, 'italian');
    
    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
  });
});
