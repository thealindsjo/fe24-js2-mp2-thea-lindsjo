import { Product } from "./product";

export function filterByCategory(products: Product[], category: string): Product[] {
    return products.filter(product => product.productCategory === category);
}

export function filterByPrice(products: Product[], maxPrice: number): Product[] {
    return products.filter(product => parseFloat(product.getDiscountedPrice()) <= maxPrice);
}

export function sortByPrice(products: Product[], ascending: boolean = true): Product[] {
    return products.sort((a, b) => {
        return ascending ? parseFloat(a.getDiscountedPrice()) - parseFloat(b.getDiscountedPrice()) : parseFloat(b.getDiscountedPrice()) - parseFloat(a.getDiscountedPrice());
    });
}

export function sortByRating(products: Product[], ascending: boolean = true): Product[] {
    return products.sort((a, b) => ascending ? a.productRating - b.productRating : b.productRating - a.productRating);
}
