let entries = [];

// Select elements
const addBtn = document.getElementById("addBtn");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");

const totalAssetsEl = document.getElementById("totalAssets");
const totalLiabilitiesEl = document.getElementById("totalLiabilities");
const netWorthEl = document.getElementById("netWorth");

// Add entry
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (name === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    const entry = {
        id: Date.now(),
        name,
        amount,
        type
    };

    entries.push(entry);

    updateDashboard();
    clearInputs();
});

// Update totals
function updateDashboard() {
    let totalAssets = 0;
    let totalLiabilities = 0;

    entries.forEach(entry => {
        if (entry.type === "asset") {
            totalAssets += entry.amount;
        } else {
            totalLiabilities += entry.amount;
        }
    });

    const netWorth = totalAssets - totalLiabilities;

    totalAssetsEl.textContent = "₹" + totalAssets;
    totalLiabilitiesEl.textContent = "₹" + totalLiabilities;
    netWorthEl.textContent = "₹" + netWorth;
}

// Clear form
function clearInputs() {
    nameInput.value = "";
    amountInput.value = "";
}
