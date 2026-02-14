let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Select elements
const aiMessage = document.getElementById("aiMessage");
const entryList = document.getElementById("entryList");
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

    entryList.innerHTML = "";

    entries.forEach(entry => {

        if (entry.type === "asset") {
            totalAssets += entry.amount;
        } else {
            totalLiabilities += entry.amount;
        }

        // Create list item
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${entry.name} (${entry.type}) - ₹${entry.amount}</span>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
        `;

        entryList.appendChild(li);
    });

    const netWorth = totalAssets - totalLiabilities;

    totalAssetsEl.textContent = "₹" + totalAssets;
    totalLiabilitiesEl.textContent = "₹" + totalLiabilities;
    netWorthEl.textContent = "₹" + netWorth;
    localStorage.setItem("entries", JSON.stringify(entries));
    generateInsights(totalAssets, totalLiabilities, netWorth);
}


// Clear form
function clearInputs() {
    nameInput.value = "";
    amountInput.value = "";
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    updateDashboard();
}
updateDashboard();

function generateInsights(totalAssets, totalLiabilities, netWorth) {

    if (entries.length === 0) {
        aiMessage.textContent = "👋 Welcome! Start by adding your assets and liabilities.";
        return;
    }

    if (totalAssets === 0) {
        aiMessage.textContent = "⚠️ You currently have liabilities but no assets. This is financially risky.";
        return;
    }

    const debtRatio = totalLiabilities / totalAssets;

    if (debtRatio > 0.5) {
        aiMessage.textContent = "⚠️ Your debt ratio is high. Consider reducing liabilities to improve financial health.";
    } else if (debtRatio < 0.3) {
        aiMessage.textContent = "✅ Your debt ratio is healthy. Keep maintaining good financial discipline.";
    } else {
        aiMessage.textContent = "ℹ️ Your financial balance is moderate. Monitor spending carefully.";
    }

    if (netWorth > 100000) {
        aiMessage.textContent += " 🚀 Great job! Your net worth is growing strong.";
    }
}

