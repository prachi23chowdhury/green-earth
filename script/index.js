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
        <a href="#" class="block px-4 py-2 hover:bg-green-200 rounded">${category.category_name}</a>
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

// new part

const loadTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => displayTrees(json.plants)); // Adjust based on exact data
};

const displayTrees = (trees) => {
  const treeContainer = document.getElementById("container");
  treeContainer.innerHTML = "";

  trees.forEach(tree => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md w-full p-4";

    card.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" class="w-full h-40 object-cover rounded-lg mb-4">

      <h2 class="text-lg font-semibold mb-1">${tree.name}</h2>

      <p class="text-sm text-gray-600 mb-3">
        ${tree.description}
      </p>

      <div class="flex items-center justify-between mb-4">
        <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">${tree.category}</span>
        <span class="text-sm font-semibold">฿${tree.price}</span>
      </div>

      <button class="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-full">
        Add to Cart
      </button>
    `;
    treeContainer.appendChild(card);
  });
};

loadTrees();


loadCategories();



