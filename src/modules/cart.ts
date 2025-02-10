import { Product } from './product.ts';

export class Cart {
    private items: Product[] = [];

    addProduct(product: Product): void {
        this.items.push(product);
    }

    getItems(): Product[] {
        return this.items;
    }

    getTotalPrice(): string {
        return this.items.reduce((total, product) => total + parseFloat(product.getDiscountedPrice()), 0).toFixed(2);
    }
}