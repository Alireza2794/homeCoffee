document.addEventListener("DOMContentLoaded", () => {

    // ‌Button For Open Product Dropdown menu and SideMenu
    const ProductButtonHeader = document.querySelector('#ProductButtonHeader');
    const ProductHeaderMenu = document.querySelector('#ProductHeaderMenu');

    ProductButtonHeader.addEventListener('click', () => {
        ProductHeaderMenu.classList.toggle('hidden');
    });

    const ProductButtonSide = document.querySelector('#ProductButtonSide');
    const ProductSideMenu = document.querySelector('#ProductSideMenu');

    ProductButtonSide.addEventListener('click', () => {
        ProductSideMenu.classList.toggle('hidden');
    });
    // ‌Button For Open Product Dropdown menu and SideMenu


    // ‌Button For Open Product sideMenu
    const sideMenuButton = document.querySelector('#sideMenuButton');
    const sideMenuCloseButton = document.querySelector('#sideMenuCloseButton');
    const sideMenuMenu = document.querySelector('#sideMenuMenu');

    // Open menu
    sideMenuButton.addEventListener('click', () => {
        sideMenuMenu.classList.remove('hidden');
    });

    // Close menu
    sideMenuCloseButton.addEventListener('click', () => {
        sideMenuMenu.classList.add('hidden');
    });
    // ‌Button For Open Product sideMenu


    // Product Items and Set to ProductHeaderMenu and sideMenuCloseButton
    const menuProductItems = [
        {
            title: "دانه قهوه",
            image: "images/IMG_7604-1.png",
            url: '#'
        },
        {
            title: "پودریجات",
            image: "images/IMG_7600.png",
            url: '#'
        },
        {
            title: "دریپ بک",
            image: "images/IMG_7596.png",
            url: '#'
        },
        {
            title: "سیروپ",
            image: "images/IMG_7461.png",
            url: '#'
        },
        {
            title: "اکسسوری",
            image: "images/ideogram-2.png",
            url: '#'
        }
    ];

    const menuHeaderContainer = document.getElementById("menuHeaderContainer");
    const ProductSideContainer = document.getElementById("ProductSideContainer");

    menuProductItems.forEach(item => {
        // menuHeaderContainer
        const menuHeaderItem = document.createElement("div");
        menuHeaderItem.innerHTML = `
          <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
            <div class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                 <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="flex-auto">
                <a href="#" class="block font-semibold text-gray-900">
                  ${item.title}
                <span class="absolute inset-0"></span>
                </a>
             </div>
         </div>
      `;
        menuHeaderContainer.appendChild(menuHeaderItem);
        // menuHeaderContainer

        // ProductSideContainer
        const menuSideItem = document.createElement("div");
        menuSideItem.innerHTML = `
        <a href="#" class="flex items-center py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">
            <img src="${item.image}" alt="${item.title}" class="w-[30px] h-[30px]">
            <span class="mx-2">${item.title}</span>
        </a>
      `;
        ProductSideContainer.appendChild(menuSideItem);
        // ProductSideContainer
    });
    // Product Items and Set to ProductHeaderMenu and sideMenuCloseButton
});