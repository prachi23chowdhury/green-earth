const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      displayCategories(json.categories);
    })
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  const sidebar = document.createElement("div");
  sidebar.className = "w-full sm:w-1/4 lg:w-full bg-[#DCFCE7] p-4";

  const items = categories.map((category) => `
      <li>
        <a id="cat-btn-${category.id}" href="#" onclick = "loadTreesByCategory(${category.id})" class="block px-4 py-2 hover:bg-green-200 cat-btn rounded">${category.category_name}</a>
      </li>
    `).join("");

  sidebar.innerHTML = `
    <h2 class="font-bold mb-4">Categories</h2>
    <ul class="space-y-2">
      <li><a href="#" class="block px-4 py-2 hover:bg-green-200 rounded">All Trees</a></li>
      ${items}
    </ul>
  `;

  categoriesContainer.appendChild(sidebar);
};

// active part
const removeActive = () =>{
  const catButtons = document.querySelectorAll(".cat-btn");
  // console.log(catButtons)
  catButtons.forEach(btn=> btn.classList.remove("active"))
};


const loadTreesByCategory = (categoryId) => {
  manageSpinner(true)
  console.log(categoryId)
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const clickBtn = document.getElementById(`cat-btn-${categoryId}`);
      //console.log(clickBtn)
      clickBtn.classList.add("active");
     displayTrees(data.plants);
    });
};

const loadTrees = () => {
  
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => displayTrees(json.plants)); // Adjust based on exact data
};

const displayTrees = async(trees) => {
  const treeContainer = document.getElementById("container");
  treeContainer.innerHTML = "";

  trees.forEach(tree => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl h-fit shadow-md p-4";

    card.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" class="w-full h-40 object-cover rounded-lg mb-4">

      <h2 onclick="loadWordDetail(${tree.id})" class="text-lg font-semibold mb-1">${tree.name}</h2>

      <p class="text-sm text-gray-600 mb-3">
        ${tree.description}
      </p>

      <div class="flex items-center justify-between mb-4">
        <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">${tree.category}</span>
        <span class="text-sm font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</span>
      </div>

       <button onclick='addToCart(${JSON.stringify({
        id: tree.id,
        name: tree.name,
        price: tree.price
      })})' 
        class="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-full">
        Add to Cart
      </button>
    `;
    treeContainer.appendChild(card);
  });
   manageSpinner(false);  
};
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 50

// modal part
 const loadWordDetail = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  const res = await fetch(url);
  const detail = await res.json();
  displayWordDetail(detail.plants);
 };
 const displayWordDetail = (tree) =>{
console.log(tree);
const detailBox = document.getElementById("detail-container")
detailBox.innerHTML = `
 <div>
        <h2 class="font-bold text-2xl pb-4 object-cover">  ${tree.name}</h2>
      <img src="${tree.image}" alt="" class="h-[300px] w-full pb-2">
      <p class="text-xs"><span class="font-bold text-sm pb-2 ">Category:</span> ${tree.category}</p>
      <p class="text-xs"><span class="font-bold text-sm pb-2 ">Price:</span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
      <p class="text-xs"><span class="font-bold text-sm pb-2">Description:</span> ${tree.description}</p>
      </div>`;
document.getElementById("word_modal").showModal()
 };

const manageSpinner = (status) =>{
  if(status===true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("container").classList.add("hidden")
  }
  else{
    document.getElementById("container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
  console.log(status)
};

// cart part

const cart = [];
let total = 0;

function addToCart(tree) {
  if (cart.find(item => item.id === tree.id)) return;
  cart.push(tree);
  total += tree.price;
  alert(`"${tree.name}" has been added to the cart!`)
  updateCartUI();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
  }
}

function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");

  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-2 rounded shadow-sm";

    li.innerHTML = `
      <div><span>${item.name}</span> <br>
      <span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${item.price}</span>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">❌</button>
    `;

    cartList.appendChild(li);
  });

  totalEl.textContent = `${total}`;
}

loadTrees();
loadCategories();



