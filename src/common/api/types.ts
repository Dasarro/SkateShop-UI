export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    discount: number;
    category: Category;
    producer: Producer;
}

export interface Category {
    categoryId: number;
    name: string;
    parrent: Category;
}

export interface Producer {
    id: number;
    name: string;
}

export interface User {
    email: string,
    username: string,
    name: string,
    surname: string,
    address: string,
    postalCode: string
}

export interface OrderProduct {
    orderProductId: number;
    product: Product;
    quantity: number;
}

export interface Order {
    orderId: number;
    user: User;
    sumPrice: number;
    status: number;
    orderProducts: OrderProduct[];
}