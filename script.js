document.addEventListener('DOMContentLoaded', () => {

    //header menubar starts

     const menuBar = document.querySelector('.menu-bars');
     const mobileMenu = document.querySelector('.mobile-menu');
     const bars = document.querySelector('.fa-bars');


     menuBar.addEventListener('click', () => mobileMenu.classList.toggle('mobile-menu-active'));
     menuBar.addEventListener('click', () => bars.classList.toggle('.fa-xmark'));

    //header menubar ends

    // home page image slider starts


    // home page image slider ends

     const slider = document.querySelector('.slider');
     const slides = document.querySelectorAll('.slide');
     const dotsContainer =document.querySelector('.dots-container');

     let currentSlide = 0;
     const slideCount = slides.length;  //4

     // inside img slider to create dot

     slides.forEach((_, index) => {  //0,1,2,3
        const dot = document.createElement("div");
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
     });

     const dots =document.querySelectorAll('.dot');

     function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        }); 
     }

     function goToSlide(index) {
        currentSlide = index;
        slider.style.transform =`translateX(-${currentSlide * 25}%)`;
        updateDots();
     }

     function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
     }

     function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
     }

     //Auto slide every 5 seconds

     setInterval(nextSlide, 5000);

     //menu card create

     // cart tab section

    const cartIcon = document.querySelector('.cart-icon');
    const cartTab = document.querySelector('.cart-tab');
    const closeBtn = document.querySelector('.close-btn');
    const cardList = document.querySelector('.card-list');
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');

    cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
    closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));

    let productList = [];
    let cartProduct = [];

    const updateTotals = () => {
        let totalPrice = 0;
        let totalQuantity = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity-value').textContent);
            const price = parseFloat(item.querySelector('.item-total').textContent.replace('&#8377;',''));

            totalQuantity += quantity;
            totalPrice += price;
        });

        cartTotal.textContent = `₹ ${totalPrice.toFixed(1)}`;
        cartCount.textContent = totalQuantity;
    }

    const showCards = () => {
        productList.forEach(product => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');

            orderCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}"  width=300px height=250px >
            </div>
            <h4>${product.name}</h4>
            <h4 class="price">&#8377; ${product.price}</h4>
            <a href="#" class="btn card-btn">Add to Cart</a>
            `;

            cardList.appendChild(orderCard);

            const cardBtn = orderCard.querySelector('.card-btn');
            cardBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(product);
            });
        });
    }

    const addToCart = (product) => {
        const existingProduct = cartProduct.find(item => item.id === product.id);
        if (existingProduct) {
            alert('Item already in your cart');
            return;
        }

        cartProduct.push(product);

        let quantity = 1;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${product.image}">
            </div>
            <div class="details">
                <h4>${product.name}</h4>
                <h4 class="item-total">${product.price}</h4>
            </div>
            <div class="flex">
                <a href="#" class="quantity-btn minus">
                    <i class="fa-solid fa-minus"></i>
                </a>
                <h4 class="quantity-value">${quantity}</h4>
                <a href="#" class="quantity-btn plus">
                    <i class="fa-solid fa-plus"></i>
                </a>
            </div>
            `;

        cartList.appendChild(cartItem);
        updateTotals();

        const plusBtn = cartItem.querySelector('.plus');
        const quantityValue = cartItem.querySelector('.quantity-value');
        const itemTotal = cartItem.querySelector('.item-total');
        const minusBtn = cartItem.querySelector('.minus');

        plusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            quantity++;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `${(product.price * quantity).toFixed(1)}`;
            updateTotals();
        })

        minusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (quantity > 1) {
                quantity--;
                quantityValue.textContent = quantity;
                itemTotal.textContent = `${(product.price * quantity).toFixed(1)}`;
                updateTotals();
            } else {
                cartItem.classList.add('slide-out');

                setTimeout(() => {
                    cartItem.remove();
                    cartProduct = cartProduct.filter(item => item.id !== product.id);
                    updateTotals();
                }, 300)
            }
        })
    }

    const initApp = () => {
        fetch('products.json').then
        (response => response.json()).then
        (data => {
            productList = data;
            showCards();
        })
    }

    initApp();

    // review page image slider starts

     const rslider = document.querySelector('.r-slider');
     const rslides = document.querySelectorAll('.r-slide');
     const prevBtn = document.querySelector('.r-slider-btn.prev');
     const nextBtn = document.querySelector('.r-slider-btn.next');

     let rcurrentSlide = 0;
     const rslideCount = rslides.length;  //4

     function rgoToSlide(index) {
        rcurrentSlide = index;
        rslider.style.transform =`translateX(-${rcurrentSlide * 25}%)`;
     }

     function rnextSlide() {
        rcurrentSlide = (rcurrentSlide + 1) % rslideCount;
        rgoToSlide(rcurrentSlide);
     }

     function rprevSlide() {
        rcurrentSlide = (rcurrentSlide - 1 + rslideCount) % rslideCount;
        rgoToSlide(rcurrentSlide);
     }

     // event listeners
     if(nextBtn) nextBtn.addEventListener('click', rnextSlide);
     if(prevBtn) prevBtn.addEventListener('click', rprevSlide);

     //Auto slide every 5 seconds
     setInterval(rnextSlide, 5000);

     // review page image slider ends


    // sign-in page
    const signInBtn = document.querySelector('.signin-btn');
    const signInPage = document.querySelector('.signin-page');
    const signInCloseBtn = document.querySelector('.icon-close');

    signInBtn.addEventListener('click', () => signInPage.classList.add('signin-page-active'));
    signInCloseBtn.addEventListener('click', () => signInPage.classList.remove('signin-page-active'));

});