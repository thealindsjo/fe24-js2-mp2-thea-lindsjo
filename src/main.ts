import { fetchProducts } from "./modules/api.ts";
import { Product } from "./modules/product.ts";
import { Cart } from "./modules/cart.ts";
import { filterByCategory, filterByPrice, sortByPrice, sortByRating } from "./modules/filter.ts";

document.addEventListener("DOMContentLoaded", async () => {
    const cart = new Cart();
    let products: Product[] = (await fetchProducts()).map(productData => new Product(productData));

    let currentCategory: string = "";
    let currentMaxPrice: number | null = null;
    let currentSortMethod: string = "price";
    let isAscending: boolean = true;

    function renderFilteredAndSortedProducts() {
        let filteredProducts = products;

        if (currentCategory) {
            filteredProducts = filterByCategory(filteredProducts, currentCategory);
        }

        if (currentMaxPrice !== null) {
            filteredProducts = filterByPrice(filteredProducts, currentMaxPrice);
        }

        if (currentSortMethod === "price") {
            filteredProducts = sortByPrice(filteredProducts, isAscending);
        } else if (currentSortMethod === "rating") {
            filteredProducts = sortByRating(filteredProducts, isAscending);
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender: Product[]) {
        const container = document.querySelector("#product-list") as HTMLElement;
        container.innerHTML = "";
        productsToRender.forEach(product => {
            container.appendChild(product.renderProductCard(() => cart.addProduct(product)));
        });
    }

    document.querySelector("#category-filter")!.addEventListener("change", event => {
        currentCategory = (event.target as HTMLSelectElement).value;
        renderFilteredAndSortedProducts();
    });

    document.querySelector("#price-filter")!.addEventListener("input", event => {
        currentMaxPrice = parseFloat((event.target as HTMLInputElement).value) || null;
        renderFilteredAndSortedProducts();
    });

    document.querySelector("#sort-price")!.addEventListener("click", () => {
        currentSortMethod = "price";
        isAscending = !isAscending;
        renderFilteredAndSortedProducts();
    });

    document.querySelector("#sort-rating")!.addEventListener("click", () => {
        currentSortMethod = "rating";
        isAscending = !isAscending;
        renderFilteredAndSortedProducts();
    });

    renderFilteredAndSortedProducts();
});
