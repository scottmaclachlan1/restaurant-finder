const { determineCuisineType } = require('../utils/restaurantUtils');

describe('Restaurant Utils', () => {
  test('should determine Italian cuisine correctly', () => {
    const restaurant = { name: "Mario's Pizza", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Italian');
  });

  test('should determine Chinese cuisine correctly', () => {
    const restaurant = { name: "Golden Dragon Chinese Restaurant", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Chinese');
  });

  test('should determine Japanese cuisine correctly', () => {
    const restaurant = { name: "Sushi Palace", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Japanese');
  });

  test('should determine Indian cuisine correctly', () => {
    const restaurant = { name: "Curry House", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Indian');
  });

  test('should determine Mexican cuisine correctly', () => {
    const restaurant = { name: "Taco Bell", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Mexican');
  });

  test('should determine cafe from types array', () => {
    const restaurant = { name: "Generic Coffee Shop", types: ["cafe", "restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Cafe');
  });

  test('should determine fast food from types array', () => {
    const restaurant = { name: "Quick Eats", types: ["meal_takeaway", "restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Fast Food');
  });

  test('should return Other for unknown cuisine', () => {
    const restaurant = { name: "Random Restaurant", types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Other');
  });

  test('should handle restaurants with missing name', () => {
    const restaurant = { name: null, types: ["restaurant"] };
    expect(determineCuisineType(restaurant)).toBe('Other');
  });

  test('should handle restaurants with missing types', () => {
    const restaurant = { name: "Mario's Pizza", types: null };
    expect(determineCuisineType(restaurant)).toBe('Italian');
  });

  test('should be case insensitive', () => {
    const restaurant1 = { name: "MARIO'S PIZZA", types: ["restaurant"] };
    const restaurant2 = { name: "mario's pizza", types: ["restaurant"] };
    const restaurant3 = { name: "Mario's Pizza", types: ["restaurant"] };
    
    expect(determineCuisineType(restaurant1)).toBe('Italian');
    expect(determineCuisineType(restaurant2)).toBe('Italian');
    expect(determineCuisineType(restaurant3)).toBe('Italian');
  });
});
