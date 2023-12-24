window.onload = async function getItems() {
    const response = await fetch("http://127.0.0.1:5000/api/items");
    if (response.ok) {
        const json = await response.json();
        const items = json.items;
        displayItems(items);
    }
}

function displayItems(items) {
    const three_productsContainer = document.getElementById("three-products-container");
    const productsContainer = document.getElementById("products-container");
    items.forEach((product, index) => {
        console.log(index);
        const listItem = document.createElement("li");
        listItem.classList.add("card__sales");

        // Создаем блок для цен
        const pricesDiv = document.createElement("div");
        pricesDiv.classList.add("card__prices");

        // Создаем div для скидки
        if (product.discount) {
            const saleAmountDiv = document.createElement("div");
            saleAmountDiv.classList.add("card__sale__amount");

            const saleText = document.createElement("p");
            saleText.classList.add("card__sale__text");
            saleText.textContent = `скидка ${product.discount_value}%`;

            saleAmountDiv.appendChild(saleText);
            listItem.appendChild(saleAmountDiv);

            const oldPrice = document.createElement("p");
            oldPrice.classList.add("card__old__price");
            oldPrice.textContent = `${product.price} ₽`;

            const newPrice = document.createElement("p");
            newPrice.classList.add("card__new__price");
            newPrice.textContent = `${product.price * (1 - product.discount_value / 100)} ₽`;

            pricesDiv.appendChild(oldPrice);
            pricesDiv.appendChild(newPrice);
        } else {
            const price = document.createElement("p");
            price.classList.add("card__new__price");
            price.textContent = `${product.price} ₽`;

            pricesDiv.appendChild(price);
        }

        // Создаем изображение для "избранного"
        const favoriteImg = document.createElement("img");
        favoriteImg.src = "static/img/favorite.svg";
        favoriteImg.alt = "favorite";
        favoriteImg.classList.add("favorite");

        // Создаем изображение товара
        const productImg = document.createElement("img");
        productImg.src = product.image;
        let route = product.image.split("/");
        let class_name = ((route.at(-1)).split(".")).at(0);
        productImg.classList.add(`${class_name}`);
        productImg.alt = `${class_name}`;

        // Создаем ссылку на товар
        const productName = processingProductName(product.name);

        // Добавляем созданные элементы в li
        listItem.appendChild(favoriteImg);
        listItem.appendChild(productImg);
        listItem.appendChild(productName);
        listItem.appendChild(pricesDiv);

        // Добавляем li в контейнер продуктов
        if (index < 3){
            three_productsContainer.appendChild(listItem);
        } else {
            productsContainer.appendChild(listItem);
        }
    });
}

function processingProductName(name) {
    const maxChars = 45;
    const productNameLink = document.createElement("a");
    productNameLink.href = "#!";
    productNameLink.classList.add("card__name");
    productNameLink.textContent = name.length > maxChars ? name.substring(0, maxChars) + "..." : name;
    return productNameLink;
}