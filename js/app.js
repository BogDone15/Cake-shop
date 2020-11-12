// anchor

(function() {
    const anchors = document.querySelectorAll('a[href^="#"]')
})();

// show cart

(function() {
    const cartinfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartinfo.addEventListener('click', function() {
        cart.classList.toggle('show-cart');
    })

})();

// add items to the cart

(function() {
    const cartBtn = document.querySelectorAll('.store-item-icon');
    const upNumber = document.querySelectorAll('.up');

    
cartBtn.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        // upNumber.forEach((item) => {
            
        //     if (item.classList.contains('surfacing')) {
        //         item.classList.remove('surfacing');
        //     } else {
        //         item.classList.add('surfacing');
        //     }

        // });

        if (event.target.parentElement.classList.contains('store-item-icon')) {
            let fullPath = event.target.parentElement.previousElementSibling.src;
            let pos = fullPath.indexOf('img') + 3;
            let partPath = fullPath.slice(pos);
            
            const item = {};

            item.img = `img-cart${partPath}`;

            let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
            item.name = name;
            
            
            let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

            let finalPrice = price.slice(1).trim();
            item.finalPrice = finalPrice;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');

            cartItem.innerHTML =
            `
                <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text">

                <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.finalPrice}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                <i class="fas fa-trash"></i>
                </a>
            </div>
            `;

            const cart = document.getElementById('cart');
            const total = document.querySelector('.cart-total-container');

            cart.insertBefore(cartItem, total);

            showTotal();
        }
    });
});


    
    function showTotal() {
        const total = [];
        const itemPrice = document.querySelectorAll('.cart-item-price');

        itemPrice.forEach(function(item) {
            total.push(parseFloat(item.textContent));
        });

        const totalMoney = total.reduce(function(total, item) {
            total += item;
            return total;
        }, 0);

        const finalTotal = totalMoney.toFixed(2);

        document.querySelector('.item-total').textContent = finalTotal;
        document.getElementById('cart-total').textContent = finalTotal;
        document.getElementById('item-count').textContent = total.length;

    }

// filter cartItem
const buttons = document.querySelectorAll('.btn');
const storeItems = document.querySelectorAll('.store-item');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const filter = e.target.dataset.filter;

        storeItems.forEach((item) => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none'
                }
            }
        })
    })
})
})();

// filter search
(function(){

    const searchBox = document.querySelector('#search-item')
    const storeItems = document.querySelectorAll('.store-item')

    searchBox.addEventListener('keyup', (e) => {
    
        const searchFilter = e.target.value.toLowerCase().trim()

        storeItems.forEach((item) => {
            if (item.textContent.includes(searchFilter)){
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        })
    })

})();


