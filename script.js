let currentProducts = products;
let categories = new Set();

const productsSection = document.querySelector(".products");
const categoriesItems = document.querySelector(".categories-items");
const searchBarInput = document.querySelector('.search-bar-input');
const emptyState = document.querySelector(".empty-state");

const renderProducts = (items) => {
  productsSection.innerHTML="";
  for(let i=0 ; i<items.length ; i++){
    const newProduct = document.createElement("div");
    newProduct.className = `product-item ${items[i].sale ? "on-sale" : ""}`;
    newProduct.innerHTML=`
    <img src="${items[i].image}" alt="${items[i].name}" />
          <p class="product-name">${items[i].name}</p>
          <div class="product-description">
            <ul>
              <li>YEAR: <strong>${items[i].year}</strong></li>
              <li>HOURS: <strong>${items[i].hours}</strong></li>
              <li>CATEGORY: <strong>${items[i].category}</strong></li>
              <li>SERIAL NUMBER: <strong>${items[i].serialNumber}</strong></li>
            </ul>
          </div>
          <div class="product-price">
            <span class="price">${items[i].price}&#8364;</span>
            <span class="discount-price">${items[i].price - items[i]. saleAmout}&#8364</span>
          </div>
          <a href="https://www.facebook.com/" target=_blank>
          <button class="contact">Contact</button>
          </a>`;

          productsSection.appendChild(newProduct);
  }
};

const renderCategories = (items) =>{
  for(let i = 0; i<items.length; i++){
    categories.add(items[i].category);
  }  

  categories = ['all',...categories];

  categories.forEach((category, index) =>{
    const newCategory = document.createElement("button");
    newCategory.innerHTML = category.toUpperCase();
    newCategory.dataset.category = category;

    index === 0 ? newCategory.classList.add("active"): "";

    categoriesItems.appendChild(newCategory);

  });
};

document.onload = renderProducts(currentProducts);
document.onload = renderCategories(currentProducts);


const categoriesButtons = document.querySelectorAll(".categories-items button");

categoriesButtons.forEach((btn) =>
  btn.addEventListener("click",(e) =>{
    const category = e.target.dataset.category;

    categoriesButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentProducts = products;

    searchBarInput.value="";

    if(category === 'all'){
      currentProducts = products;
    }else{
      currentProducts = currentProducts.filter(
        (product) => product.category === category
      );
      emptyState.classList.remove("active");
    }

    renderProducts(currentProducts);
  })
  );

 

  searchBarInput.addEventListener('input', (e)=>{
    const search = e.target.value;

    const foundProducts = currentProducts.filter((product) =>{
      if(product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
        return product;
      }
    });
    foundProducts.length === 0 
    ?emptyState.classList.add("active")
    :emptyState.classList.remove("active");

    renderProducts(foundProducts);
  });

  


