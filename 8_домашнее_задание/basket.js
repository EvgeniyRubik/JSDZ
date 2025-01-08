'use strict';

let basketCounterEl = document.querySelector('.cartIconWrap span');
let basketOpening = document.querySelector('.cartIconWrap');
let basketEl = document.querySelector('.basket');
let itemsEls = document.querySelectorAll('.featuredItem');
let basketTotalValueEl = document.querySelector('.basketTotalValue'); 
let basketTotalEl = document.querySelector('.basketTotal');
let basket = {};

basketOpening.addEventListener('click', function(){
    basketEl.classList.toggle('hidden');
});

itemsEls.forEach(function(item) {
    item.addEventListener('click', function(event) {
        if(!event.target.closest(".addToCart")) {
            return;
        }
        const id = +this.dataset.id;
        const name = this.dataset.name;
        const price = +this.dataset.price;   
        addToCart(id,name,price);
    })
});

function addToCart (id,name,price) {
    if(!(id in basket)) {
        basket[id] = {id, name, price, count: 1};
    } else {
        basket[id].count++;
    }
    basketCounterEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    // return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
    const productsArr = Object.values(basket);
    let count = 0;
    for (const product of productsArr) {
        count += product.count;
    }
    return count;
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;    
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].price * basket[id].count;
}
function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span>
            </div>
            <div>${basket[productId].price}</div>
            <div>
                <span class="productTotalRow">${(basket[productId].price)}</span>
            </div>
        </div>    
    `; 
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);   
}