// Initialize variables
let progress = 0;
const progressBar = document.getElementById("progressBar");
const bundleItemsContainer = document.getElementById("bundleItemsContainer");
const subtotalAmount = document.getElementById("subtotalAmount");
const discountAmount = document.getElementById("discountAmount");
const ctaButton = document.getElementById("ctaButton");
const allAddButtons = document.querySelectorAll(".bundle-btn");
let selectedItems = [];
const pricePerItem = 150.00;
const discountPercentage = 0.30;









// Function to update the sidebar and totals
function updateSidebarAndTotals() {
    bundleItemsContainer.innerHTML = '';
    let total = 0;
    
    // Add selected items to the bundle container
    selectedItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "product-placeholder";
        itemElement.innerHTML = `<img src="${item.imgSrc}" alt="${item.name}" style="height: 100%; width: 100%; object-fit: cover;">`;
        bundleItemsContainer.appendChild(itemElement);
        total += item.price;
    });










    
    // Calculate discount
    let discount = 0;
    if (selectedItems.length <= 3) {
        discount = total * discountPercentage;
        ctaButton.disabled = false;
        ctaButton.textContent = `Add ${selectedItems.length} Items to Proceed`;
    } else {
        ctaButton.disabled = true;
        ctaButton.textContent = `Add 3 Items to Proceed`;
    }
    
    // Update totals display
    subtotalAmount.textContent = `$${(total - discount).toFixed(2)}`;
    discountAmount.textContent = `$${discount.toFixed(2)}`;
    
    // Update progress bar
    progress = selectedItems.length * (100 / 3);
    progressBar.style.width = Math.min(progress, 100) + "%";
}















// Add event listeners to all "Add to Bundle" buttons
allAddButtons.forEach(button => {
    button.addEventListener("click", function() {
        const productCard = this.closest(".card");
        const productId = this.dataset.productId;
        const productName = productCard.querySelector(".card-text").textContent;
        const productPrice = parseFloat(productCard.querySelector(".price").dataset.price);
        const productImageSrc = productCard.querySelector(".card-img-top").dataset.img;
        
        // Checking if item is already selected
        const existingItemIndex = selectedItems.findIndex(item => item.id === productId);
        
        if (existingItemIndex === -1) {
            // Add the item
            selectedItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                imgSrc: productImageSrc
            });
            this.innerHTML = "Remove from Bundle<span>-</span>";
            this.classList.add("remove-btn");
        } else {
            // Remove the item
            selectedItems.splice(existingItemIndex, 1);
            this.innerHTML = "Add to Bundle<span>+</span>";
            this.classList.remove("remove-btn");
        }
        
        updateSidebarAndTotals();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    updateSidebarAndTotals();
});