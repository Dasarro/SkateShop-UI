import React, { useState, createContext, useContext, useEffect } from "react";
import { getFinalPrice } from "../../common/helpers/priceOperations";
import { useProducts } from "../../common/hooks/useProducts";
import { StoredProduct, Product } from './../../common/api/types';

interface Context {
    products: Product[];
    basketProducts: StoredProduct[];
    calculateCost: () => number;
    setBasketProducts: (basketProducts: StoredProduct[]) => void;
}

const BasketContext = createContext<Context>({
    products: [],
    basketProducts: [],
    calculateCost: () => 0,
    setBasketProducts: ([]) => undefined
});

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: React.FC = ({ children }) => {
    const { products, fetchSpecifiedProducts } = useProducts();
    const basket = localStorage.getItem('basket');
    const [basketProducts, setBasketProducts] = useState<StoredProduct[]>(basket !== null && basket !== '' ? JSON.parse(basket) : []);

    useEffect(() => {
        fetchSpecifiedProducts(basketProducts.map(product => product.productId));
        localStorage.setItem('basket', JSON.stringify(basketProducts));
    }, [basketProducts])

    const calculateCost = (): number => {
        let cost = 0;
        products.forEach(({id, price, discount}) => {
            const basketProduct = basketProducts.find(x => x.productId === id);
            if (basketProduct) {
                cost += basketProduct.quantity * getFinalPrice(price, discount);
            }
        });
        return cost;
    }

    return (
        <BasketContext.Provider value={{
            products,
            basketProducts,
            calculateCost,
            setBasketProducts
        }}>
            {children}
        </BasketContext.Provider>
    )
}