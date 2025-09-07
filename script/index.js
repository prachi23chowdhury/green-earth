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
  sidebar.className = "w-full sm:w-1/4 lg:w-1/5 bg-[#DCFCE7] p-4";

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

loadCategories();



