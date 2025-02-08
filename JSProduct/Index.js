document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");
  const filterInput = document.getElementById("filterInput");
  const sortSelect = document.getElementById("sortSelect");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let lastProductId = localStorage.getItem("lastProductId") ? parseInt(localStorage.getItem("lastProductId")) : 0;
  let editingIndex = null;

  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("lastProductId", lastProductId);
  }

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.ProductId} - ${product.ProductName}</strong><br>
        <img src="${product.Image}" width="100" height="100"" alt="Product Image"><br>
        Price: ₹${product.Price}<br>
        ${product.Description}<br>
        <div class="btn-container">
          <button onclick="editProduct(${index})" class="edit-btn">✏️</button>
          <button onclick="deleteProduct(${index})" class="delete-btn">🗑️</button>
        </div>
      `;
      productList.appendChild(li);
    });
  }

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const ProductName = document.getElementById("ProductName").value.trim();
    const Price = parseFloat(document.getElementById("Price").value.trim());
    const Description = document.getElementById("Description").value.trim();
    const ImageInput = document.getElementById("Image").files[0]; // Get selected file

    if (!ProductName || isNaN(Price) || !Description) {
      alert("All fields are required, and price must be a number");
      return;
    }

    if (ImageInput) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const ImageBase64 = event.target.result; // Convert to Base64

        if (editingIndex !== null) {
          products[editingIndex] = { ...products[editingIndex], ProductName, Image: ImageBase64, Price, Description };
          editingIndex = null;
        } else {
          lastProductId++;
          products.push({ ProductId: lastProductId, ProductName, Image: ImageBase64, Price, Description });
        }

        saveProducts();
        renderProducts();
        productForm.reset();
      };

      reader.readAsDataURL(ImageInput);
    } else {
      alert("Please select an image.");
    }
  });

  window.editProduct = (index) => {
    const product = products[index];
    document.getElementById("ProductName").value = product.ProductName;
    document.getElementById("Price").value = product.Price;
    document.getElementById("Description").value = product.Description;
    editingIndex = index;
  };

  window.deleteProduct = (index) => {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
  };

  filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.trim();
    let filteredProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (filterValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.ProductId.toString().includes(filterValue)
      );
    }

    productList.innerHTML = "";
    filteredProducts.forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.ProductId} - ${product.ProductName}</strong><br>
        <img src="${product.Image}" width="100" height="100" onerror="this.src='fallback.jpg';" alt="Product Image"><br>
        Price: ₹${product.Price}<br>
        ${product.Description}<br>
        <div class="btn-container">
          <button onclick="editProduct(${index})" class="edit-btn">✏️</button>
          <button onclick="deleteProduct(${index})" class="delete-btn">🗑️</button>
        </div>
      `;
      productList.appendChild(li);
    });
  });

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    if (sortBy) {
      products.sort((a, b) => {
        if (sortBy === "ProductId" || sortBy === "Price") {
          return a[sortBy] - b[sortBy];
        } else {
          return a[sortBy].localeCompare(b[sortBy]);
        }
      });
    }
    renderProducts();
  });

  renderProducts();
});
