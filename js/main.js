document.addEventListener("DOMContentLoaded", () => {
    // For hidden preloader after 2s
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            preloader.style.display = "none";
        }
    }, 2000);
    // End Preloader 


    // ‌Button For Open Cart Box
    const cartPopupButton = document.querySelector('#cartPopupButton');
    const cartPopup = document.querySelector('#cartPopup');
    let isHoveringOverPopup = false;
    cartPopupButton.addEventListener('mouseenter', () => {
        cartPopup.classList.remove('hidden');
        renderCartItems();
    });

    cartPopupButton.addEventListener('mouseleave', () => {
        hidePopupWithDelay();
    });

    cartPopup.addEventListener('mouseenter', () => {
        isHoveringOverPopup = true;
        cartPopup.classList.remove('hidden');
    });

    cartPopup.addEventListener('mouseleave', () => {
        isHoveringOverPopup = false;
        hidePopupWithDelay();
    });

    function hidePopupWithDelay() {
        setTimeout(() => {
            if (!isHoveringOverPopup) {
                cartPopup.classList.add('hidden');
            }
        }, 200);
    }
    // ‌Button For Open Cart Box
});



// Cart box totalCountPrice and totalCountProduct
let totalCountPrice = document.getElementById("totalCountPrice");
let totalPrice = 0;
totalCountPrice.innerHTML = `${totalPrice} تومان`;
let totalCountProduct = document.getElementById("totalCountProduct");
let totalCount = 0;
totalCountProduct.innerHTML = `${totalCount}`;

function updateCartUI() {
    let cartItems = getCartItems();
    totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    totalCountPrice.innerHTML = `${new Intl.NumberFormat('en-US').format(totalPrice)} تومان`;

    totalCount = cartItems.reduce((sum, item) => sum + item.totalInCart, 0);
    totalCountProduct.innerHTML = `${totalCount}`;
}

updateCartUI();
// Cart box totalCountPrice and totalCountProduct


// Product Items and Set to New Product Section
let ProductItems = [];

function fetchProducts() {
    fetch('https://67530c66f3754fcea7ba9368.mockapi.io/api/v1/products')
        .then(response => {
            if (!response.ok) throw new Error('خطا در دریافت اطلاعات محصولات');
            return response.json();
        })
        .then(data => {
            ProductItems = data;
            renderProductItems();
        })
        .catch(error => {
            ProductItems = LocalProductItems;
            console.log(JSON.stringify(ProductItems));

            renderProductItems();
            console.error('Error:', error);
        });
}
fetchProducts();


function renderProductItems() {
    const itemBoxContainer = document.getElementById("itemBoxContainer");
    const itemBoxDiscountContainer = document.getElementById("itemBoxDiscountContainer");
    itemBoxContainer.innerHTML = '';
    itemBoxDiscountContainer.innerHTML = '';
    ProductItems.forEach(item => {
        // itemBoxContainer
        let Item = document.createElement("div");
        Item.className = "flex-shrink-0";
        let price = new Intl.NumberFormat('en-US').format(item.price);
        let priceWithDiscount = '';
        if (item.priceWithDiscount > 0) {
            priceWithDiscount = new Intl.NumberFormat('en-US').format(item.priceWithDiscount);
        }


        Item.innerHTML = `
            <div class="flex flex-col items-center">
    
                 <!-- image box -->
                <div class="productImage relative">
    
                    <div class="relative">
                        <!-- discount box -->
                    ${item.discount > 0 ? `<div class="flex items-center justify-center w-[50px] h-[50px] lg:w-[50px] lg:h-[50px] rounded-full bg-[#B0A27B] absolute top-[5px] right-[5px]">
                            <span class="text-[#fff] test-[14px]">-${item.discount}%</span>
                        </div>` : ""}
    
                        <img src="${item.image[0]}" alt="${item.title}" class="w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] rounded-[20px]">
                    </div>
    
                   <button type="button" class="absolute top-0 left-0 right-0 bottom-0 text-gray-500 hover:text-gray-800 font-semibold" onclick="openModalProductView(${item.id})">
                      نمایش جزئیات
                   </button>
                </div>
    
                <!-- Title -->
                <h2 class="text-[#333333] text-[12px] lg:text-[14px] font-semibold my-3 max-w-[180px] lg:max-w-[250px] whitespace-pre-wrap">${item.title}</h2>
    
                <!-- Price -->
                <div class="flex items-center mb-3">
                    ${item.priceWithDiscount > 0 ? `<span class="text-[#BBBBBB] text-[12px] lg:text-[18px] line-through">${price} تومان</span>` :
                `<span class="text-[#B0A27B] text-[12px] lg:text-[18px]">${price} تومان</span>`}
                    ${item.priceWithDiscount > 0 ? `<span class="text-[#B0A27B] text-[12px] lg:text-[18px] ms-2 lg:ms-4">${priceWithDiscount} تومان</span>` : ""}
                </div>
    
    
                <!-- Button -->
                ${item.count > 0 ? `
                              <button class="w-[140px] h-[40px] lg:w-[189px] lg:h-[50px] rounded-full bg-[#7F6051] flex items-center justify-center cursor-pointer mx-4 my-2"
                     onclick="AddToCart(${item.id})">
                    <span class="!mb-0 !mx-2 font-bold text-[12px] lg:text-[14px] text-[#fff]">
                        افزودن به سبد خرید
                    </span>
                </button>
                    ` : `<div class="w-[140px] h-[40px] lg:w-[189px] lg:h-[50px] flex items-center justify-center">ناموجود</div>`}
    
            </div>
          `;
        itemBoxContainer.appendChild(Item);
        // itemBoxContainer


        // itemBoxDiscountContainer
        if (item.discount > 0) {
            let DiscountItem = document.createElement("span");
            let DiscountPrice = new Intl.NumberFormat('en-US').format(item.price);
            let DiscountPriceWithDiscount = '';
            if (item.priceWithDiscount > 0) {
                DiscountPriceWithDiscount = new Intl.NumberFormat('en-US').format(item.priceWithDiscount);
            }

            DiscountItem.innerHTML = `
                <div class="flex flex-col items-center">
        
                     <!-- image box -->
                    <div class="productImage relative">
        
                        <div class="relative">
                            <!-- discount box -->
                        ${item.discount > 0 ? `<div class="flex items-center justify-center w-[50px] h-[50px] lg:w-[50px] lg:h-[50px] rounded-full bg-[#B0A27B] absolute top-[5px] right-[5px]">
                                <span class="text-[#fff] test-[14px]">-${item.discount}%</span>
                            </div>` : ""}
        
                            <img src="${item.image[0]}" alt="${item.title}" class="w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] lg:min-w-[250px] lg:min-h-[250px] rounded-[20px]">
                        </div>
        
                       <button type="button" class="absolute top-0 left-0 right-0 bottom-0 text-gray-500 hover:text-gray-800 font-semibold" onclick="openModalProductView(${item.id})">
                          نمایش جزئیات
                       </button>
                    </div>
        
                    <!-- Title -->
                    <h2 class="text-[#333333] text-[12px] lg:text-[14px] font-semibold my-3 max-w-[180px] lg:max-w-[250px] whitespace-pre-wrap">${item.title}</h2>
        
                    <!-- Price -->
                    <div class="flex items-center mb-3">
                        ${item.priceWithDiscount > 0 ? `<span class="text-[#BBBBBB] text-[12px] lg:text-[18px] line-through">${DiscountPrice} تومان</span>` :
                    `<span class="text-[#B0A27B] text-[12px] lg:text-[18px]">${DiscountPrice} تومان</span>`}
                        ${item.priceWithDiscount > 0 ? `<span class="text-[#B0A27B] text-[12px] lg:text-[18px] ms-2 lg:ms-4">${DiscountPriceWithDiscount} تومان</span>` : ""}
                    </div>
        
        
                    <!-- Button -->
                    ${item.count > 0 ? `
                        <button class="w-[140px] h-[40px] lg:w-[189px] lg:h-[50px] rounded-full bg-[#7F6051] flex items-center justify-center cursor-pointer mx-4 my-2"
                         onclick="AddToCart(${item.id})">
                        <span class="!mb-0 !mx-2 font-bold text-[12px] lg:text-[14px] text-[#fff]">
                            افزودن به سبد خرید
                        </span>
                        </button>
                        ` : `<div class="w-[140px] h-[40px] lg:w-[189px] lg:h-[50px] flex items-center justify-center">ناموجود</div>`}
                </div>
              `;
            itemBoxDiscountContainer.appendChild(DiscountItem);
        }
        // itemBoxContainer
    });
}
renderProductItems();
// Product Items and Set to New Product Section


function AddToCart(id) {
    // Find the product by id
    const product = ProductItems.find(item => item.id === id);
    if (!product) return;


    // Check if the product is already in the cart
    let cartItems = getCartItems();
    const existingProduct = cartItems.find(item => item.id === id);
    if (existingProduct) {
        showToast("این محصول قبلاً به سبد خرید اضافه شده است.", "warning", 5000);
        return;
    }
    else {
        if (product.count === 0) {
            showToast("موجودی کافی نیست!", "warning", 5000);
            return;
        }

        // Add the product to the cart and save to localStorage and updateCartUI
        product.count--;
        let totalPrice = (product.priceWithDiscount ? product.priceWithDiscount : product.price) * 1;
        cartItems.push({ ...product, totalInCart: product.totalInCart ?? 0 + 1, totalPrice: totalPrice });
        saveCartItems(cartItems);
        updateCartUI();
        renderProductItems()
        showPopupAddedCart(product);
    }
}

function showPopupAddedCart(product) {
    const popupAddedCart = document.getElementById("popupAddedCart");
    const popupBody = document.getElementById("popupBody");
    const popupCloseButton = document.getElementById("popupCloseButton");

    // Setting product information in the popup
    popupBody.innerHTML = `
        <img src="${product.image[0]}" alt="${product.title}" class="w-[50px] h-[50px] rounded">
        <p class="text-gray-700">${product.title}</p>
    `;

    popupAddedCart.classList.remove("hidden");

    // Close popup after 3s
    const timeout = setTimeout(() => {
        popupAddedCart.classList.add("hidden");
    }, 3000);

    // Close popup with button
    popupCloseButton.addEventListener("click", () => {
        clearTimeout(timeout); // Prevent re close with timer
        popupAddedCart.classList.add("hidden");
    });
}

// Cart Section **

// get list of cart from local storage
function getCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
}

// save edited list of cart to local storage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// calculate Total Price
function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

function renderCartItems() {
    const cartItems = getCartItems();
    const cartPopupContent = document.querySelector('#cartPopupContainer');
    if (cartPopupContent) {
        cartPopupContent.innerHTML = '';

        if (cartItems.length === 0) {
            cartPopupContent.innerHTML = '<p class="text-gray-500">سبد خرید شما خالی است.</p>';
            return;
        }

        cartItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = "flex items-center justify-between mb-4";
            listItem.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image[0]}" alt="${item.title}" class="w-16 h-16 rounded-md ml-4">
                    <div>
                        <p class="font-medium">${item.title}</p>
                        <div class="flex items-center">
                           <p class="text-sm text-gray-500">${new Intl.NumberFormat('en-US').format(item.totalPrice)} تومان</p>
                            <p class="text-gray-700 !ms-3">تعداد: ${item.totalInCart}</p>
                        </div>
                    </div>
                </div>
                <button class="text-red-500 font-bold" onclick="removeCartItem(${item.id})">حذف</button>
            `;
            cartPopupContent.appendChild(listItem);
        });


        // نمایش جمع کل مبلغ
        const totalPrice = calculateTotalPrice(cartItems);
        const totalPriceElement = document.createElement('div');
        totalPriceElement.className = "border-t pt-4 mt-4 text-right font-medium";
        totalPriceElement.innerHTML = `
                جمع کل: <span class="text-[#B0A27B]">${new Intl.NumberFormat('en-US').format(totalPrice)} تومان</span>
            `;
        cartPopupContent.appendChild(totalPriceElement);


        // اضافه کردن دکمه تسویه حساب
        const checkoutButton = document.createElement('button');
        checkoutButton.className = "w-full mt-4 py-2 bg-[#7F6051] text-white rounded-md font-bold hover:bg-[#65483e] transition";
        checkoutButton.innerHTML = "تسویه حساب";
        checkoutButton.addEventListener('click', () => {
            alert('تسویه حساب انجام شد!');
            // اینجا می‌توانید کارهای مرتبط با تسویه حساب را انجام دهید
        });
        cartPopupContent.appendChild(checkoutButton);
    }
}

// remove product from cart
function removeCartItem(id) {
    let cartItems = getCartItems();

    // delete product
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
        saveCartItems(cartItems); // save in localstorage
        updateCartUI();// update cart button
        renderProductItems();
        renderCartItems();// update popup
        
    } else {
        showToast(`محصول با این آیدی پیدا نشد:${id}`, "warning", 5000);
    }
    // delete product
}
// End Cart Section **



// Product modal view
function openModalProductView(id) {
    // Find the product by id
    const product = ProductItems.find(item => item.id === id);
    if (!product) return;

    document.getElementById("productView").classList.remove('hidden');
    renderModalProductView(product);
}

let slideIndex = 1;
function renderModalProductView(product) {
    const popupBody = document.getElementById("popupProductViewBody");

    let price = new Intl.NumberFormat('en-US').format(product.price);
    let priceWithDiscount = '';
    if (product.priceWithDiscount > 0) {
        priceWithDiscount = new Intl.NumberFormat('en-US').format(product.priceWithDiscount);
    }

    popupBody.innerHTML = `
         <!-- Product Gallery -->
        <div>
            <div class="slideshow-container w-[260px] lg:max-w-[1000px] relative m-auto">

           ${product.image.map((imgSrc, index) => `
                <div class="mySlides fade ${index === 0 ? 'block' : 'hidden'}">
                    <img src="${imgSrc}" class="w-full rounded-lg">
                </div>
            `).join('')}

                <a class="next" onclick="plusSlides(1)">❯</a>
                <a class="prev" onclick="plusSlides(-1)">❮</a>
            </div>
        </div>
        <!-- Product Details -->
        <div class="flex flex-col">
            <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
            
            <!-- Price -->
            <div class="flex items-center mb-3">
                ${product.priceWithDiscount > 0 ? `<span class="text-[#BBBBBB] text-[12px] lg:text-[18px] line-through">${price} تومان</span>` : `<span class="text-[#B0A27B] text-[12px] lg:text-[18px]">${price} تومان</span>`}
                ${product.priceWithDiscount > 0 ? `<span class="text-[#B0A27B] text-[12px] lg:text-[18px] ms-2 lg:ms-4">${priceWithDiscount} تومان</span>` : ""}
            </div>

            <!-- Buttons -->
            <div class="flex flex-col lg:flex-row items-center">
                ${product.count > 0 ? `
                <!-- Quantity Selector -->
                <div class="flex items-center w-[151px] relative">
                    <button class="btn-decrease absolute text-gray-700 px-3 py-2 rounded-lg" disabled="disabled" data-type="minus" data-field="quant[1]">-</button>
                    <input type="text" name="quant[1]" class="input-number" value="1" min="1" data-max="${product.count}">
                    <button class="btn-increase absolute left-0 text-gray-700 px-3 py-2 rounded-lg" data-type="plus" data-field="quant[1]">+</button>
                </div>

                <!-- Add to Cart -->
                <button class="w-[140px] h-[40px] lg:w-[189px] lg:h-[50px] rounded-full bg-[#7F6051] flex items-center justify-center cursor-pointer mx-4 my-2"
                  onclick="addProductToCart(${product.id})">
                    <span class="!mb-0 !mx-2 font-bold text-[12px] lg:text-[14px] text-[#fff]">
                        افزودن به سبد خرید
                    </span>
                </button>
                    ` : 'محصول در انبار موجود نیست'}
            </div>
        </div>
    `;


    showSlides(slideIndex);

    // Quantity controls
    const quantityInput = document.querySelector('.input-number');
    const decreaseButton = document.querySelector('.btn-decrease');
    const increaseButton = document.querySelector('.btn-increase');

    // Update button states
    const updateButtonStates = () => {
        const quantity = parseInt(quantityInput.value, 10);
        const maxQuantity = parseInt(quantityInput.getAttribute('data-max'), 10);

        decreaseButton.disabled = quantity <= 1;
        increaseButton.disabled = quantity >= maxQuantity;
    };

    // Add event listeners
    decreaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value, 10);
        if (quantity > 1) {
            quantityInput.value = --quantity;
            updateButtonStates();
        }
    });

    increaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value, 10);
        const maxQuantity = parseInt(quantityInput.getAttribute('data-max'), 10);
        if (quantity < maxQuantity) {
            quantityInput.value = ++quantity;
            updateButtonStates();
        }
    });

    quantityInput.addEventListener('input', () => {
        let quantity = parseInt(quantityInput.value, 10) || 1;
        const maxQuantity = parseInt(quantityInput.getAttribute('data-max'), 10);

        if (quantity < 1) quantity = 1;
        if (quantity > maxQuantity) quantity = maxQuantity;

        quantityInput.value = quantity;
        updateButtonStates();
    });
}

// Add to cart
function addProductToCart(productId) {
    // Find the product by id
    const product = ProductItems.find(item => item.id === productId);
    if (!product) return;

    // Check if the product is already in the cart
    let cartItems = getCartItems();
    const existingProduct = cartItems.find(item => item.id === productId);
    if (existingProduct) {
        showToast("این محصول قبلاً به سبد خرید اضافه شده است.", "warning", 5000);
        return;
    }
    else {
        const quantityInput = document.querySelector('.input-number');
        const quantity = parseInt(quantityInput.value, 10);
        if (quantity > product.count) {
            showToast("موجودی کافی نیست!", "warning", 5000);
            return;
        }

        product.count -= quantity;
        let totalPrice = (product.priceWithDiscount ? product.priceWithDiscount : product.price) * quantity;
        cartItems.push({ ...product, totalInCart: product.totalInCart ?? 0 + quantity, totalPrice: totalPrice });
        saveCartItems(cartItems);
        updateCartUI();
        showPopupAddedCart(product);
        renderModalProductView(product);
    }
};

function closeModalProductView() {
    document.getElementById("productView").classList.add('hidden');
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// End Product modal view


// Toast section
const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {

    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` 
        <div class="toast-content-wrapper">
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        </div>`;

    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box);
};


// LocalData
const LocalProductItems = [
    {
        id: 1,
        title: "لولر چوبی گتر 58 اصل",
        discount: 0,
        price: 380000,
        priceWithDiscount: 0,
        image: ["images/products/wooden-leveler-58mm-gater1.png", "images/products/leveler2.png"],
        count: 3
    },
    {
        id: 2,
        title: "دانه قهوه اسپرسو جیورنو بن مانو",
        discount: 12,
        price: 168000,
        priceWithDiscount: 148000,
        image: ["images/products/giorno-800x800.jpg.png"],
        count: 3
    },
    {
        id: 3,
        title: "دانه قهوه اسپرسو ویتالی (بن مانو )",
        discount: 7,
        price: 138000,
        priceWithDiscount: 128000,
        image: ["images/products/vitaly-800x800.jpg.png"],
        count: 1
    },
    {
        id: 4,
        title: "دانه قهوه اسپرسو‌ لِیدی روپل",
        discount: 0,
        price: 365000,
        priceWithDiscount: 0,
        image: ["images/products/pink-800x800.jpg.png"],
        count: 1
    },
    {
        id: 5,
        title: "دانه قهوه اسپرسو‌ دِیلی روپل",
        discount: 9,
        price: 350000,
        priceWithDiscount: 320000,
        image: ["images/products/blue-800x800.jpg.png"],
        count: 1
    },
    {
        id: 6,
        title: "سری قرمز (100% ربوستا تیره)",
        discount: 0,
        price: 221000,
        priceWithDiscount: 0,
        image: ["images/products/red-seri.jpg"],
        count: 4
    },
    {
        id: 7,
        title: "سری نارنجی (100% ربوستا)",
        discount: 5,
        price: 225000,
        priceWithDiscount: 220000,
        image: ["images/products/yello-seri.jpg"],
        count: 10
    },
    {
        id: 8,
        title: "سری سبز (30% عربیکا – 70% ربوستا)",
        discount: 5,
        price: 225000,
        priceWithDiscount: 220000,
        image: ["images/products/green-seri.jpg"],
        count: 10
    },
];