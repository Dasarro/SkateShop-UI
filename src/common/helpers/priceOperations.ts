export const getFinalPrice = (price: number, discount: number): number => (price - price * 0.01 * discount);

export const formatPrice = (price: number): string => `${price.toFixed(2)} PLN`;
