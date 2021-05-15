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