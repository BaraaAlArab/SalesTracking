// Attach the event listener to the "Calculate" button
document.getElementById("calculateBtn").addEventListener("click", calculateSales);
// Optional: Add event listener for the Reset button
document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("morningSales").value = "";
    document.getElementById("nightSales").value = "";
    document.getElementById("dailySales").value = "";
    //document.getElementById("PaymentDate").dataset.paymentDate = ""; // Clear the payment date data attribute
    document.getElementById("result").textContent = "";
    document.getElementById("TrunOn").disabled = false;
    document.getElementById("TrunOff").disabled = false;
    
});
document.getElementById("quantityInput").addEventListener("input", 
    function() {
    var price = Number(document.getElementById("priceInput").value) || 0;
    var quantity = Number(document.getElementById("quantityInput").value) || 0;
    var total = price * quantity;
    document.getElementById("totalInput").value = total.toFixed(2);
});
// Attach event listeners to price and quantity inputs to recalculate total
document.getElementById("priceInput").addEventListener("input", calculateQuantity);
document.getElementById("quantityInput").addEventListener("input", calculateQuantity);
// Attach event listeners to price and quantity inputs to recalculate total
document.getElementById("priceInput").addEventListener("input", calculateQuantity);
// Attach event listener to the "Add to History" button
document.getElementById("addSaleRowBtn").addEventListener("click", addSaleToHistory);
document.getElementById("editeBtn").addEventListener("click", openSalesTargetEditor);
document.getElementById("closeDialogBtn").addEventListener("click", closeEditDialog);
document.getElementById("editDialog").addEventListener("click", function(event) {
    if (event.target.id === "editDialog") closeEditDialog();
});

document.getElementById("voidBtn").addEventListener("click", function() {
    var historyTable = document.getElementById("historyTable");
    var rowCount = historyTable.rows.length;
    if (rowCount > 1) { // Ensure there's at least one row to delete (header row)
        historyTable.deleteRow(-1); // Delete the last row
    } else {
        showToast("No sales history to void.");
    }
});

// Toast notification function
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000); // Hide after 3 seconds
}

// Global variable to track if commission is turned on
let isCommissionOn = true;

document.getElementById("TrunOn").addEventListener("click", function() {
    isCommissionOn = true;
    showToast("Commission Turned ON");
});

document.getElementById("TrunOff").addEventListener("click", function() {
    isCommissionOn = false;
    showToast("Commission Turned OFF");
});

function calculateSales() {
    // Get values from the inputs, use 0 if the input is empty
    var morningSales = Number(document.getElementById("morningSales").value) || 0;
    var nightSales = Number(document.getElementById("nightSales").value) || 0;
    
    // Example Calculation: Total sales is morning + night
    var totalSales = morningSales + nightSales;
    
    // Calculate commission based on the selected percentage from the dropdown
    var commissionSelect = document.getElementById("Commission");
    var commissionRate = commissionSelect.value; // e.g., "10%"
    var commissionPercentage = parseFloat(commissionRate) / 100; // Convert to decimal
    
    var result = 0;
    var morningComm = 0;
    var nightComm = 0;

    // Logic: check if commission is ON
    if (isCommissionOn) {
        result = totalSales * commissionPercentage;
        morningComm = morningSales * commissionPercentage;
        nightComm = nightSales * commissionPercentage;
    } else {
        result = 0; // Commission is off
        commissionRate = "OFF";
    }

    // Add bonus if daily target is met
    if (document.getElementById("dailySales").value) {
        var dailyTarget = Number(document.getElementById("dailySales").value);
        if (totalSales >= dailyTarget) {
            result += 50; // Add a bonus of $50 if the target is met
        }
        else {
            showToast("Daily target not met. No bonus added.");
        }
    }
    
    
    // Update the result paragraphs
    document.getElementById("MorningResult").textContent = "Morning Sales: " + morningSales + " | Commission (" + commissionRate + "): " + morningComm.toFixed(2);
    document.getElementById("NightResult").textContent = "Night Sales: " + nightSales + " | Commission (" + commissionRate + "): " + nightComm.toFixed(2);
    document.getElementById("DailyResult").textContent = "Total Daily Sales: " + totalSales + " | Total Commission/Bonus: " + result.toFixed(2);
    document.getElementById("PaymentDate").textContent = "Payment Date: " + new Date().toLocaleDateString(); //Show the payment date in the result section
}


function calculateQuantity() {
    var price = Number(document.getElementById("priceInput").value) || 0;
    var quantity = Number(document.getElementById("quantityInput").value) || 0;
    var total = price * quantity;
    document.getElementById("totalInput").value = total.toFixed(2);
}



function openSalesTargetEditor() {
    const dialog = document.getElementById("editDialog");
    const body = document.getElementById("dialogBody");
    document.getElementById("dialogTitle").textContent = "Edit sales target";
    body.innerHTML = `
        <label>Morning sales</label>
        <input id="editMorning" type="number" value="${document.getElementById("morningSalesTarget").textContent}">
        <label>Night sales</label>
        <input id="editNight" type="number" value="${document.getElementById("nightSalesTarget").textContent}">
        <label>Commission</label>
        <select id="editCommission">
            <option value="10%" ${document.getElementById("commissionTarget").textContent === "10%" ? "selected" : ""}>10%</option>
            <option value="15%" ${document.getElementById("commissionTarget").textContent === "15%" ? "selected" : ""}>15%</option>
            <option value="20%" ${document.getElementById("commissionTarget").textContent === "20%" ? "selected" : ""}>20%</option>
        </select>
        <label>Target sales</label>
        <input id="editTarget" type="number" value="${document.getElementById("dailySalesTarget").textContent}">
        <label>Date</label>
        <input id="editDate" type="date" value="${document.getElementById("salesDateTarget").textContent === "mm/dd/yyyy" ? "" : document.getElementById("salesDateTarget").textContent}">
        <div class="modal-actions">
            <button type="button" class="ghost-btn" id="cancelEditBtn">Cancel</button>
            <button type="button" id="saveEditBtn">Save</button>
        </div>
    `;
    dialog.classList.add("open");
    dialog.setAttribute("aria-hidden", "false");
    document.getElementById("cancelEditBtn").addEventListener("click", closeEditDialog);
    document.getElementById("saveEditBtn").addEventListener("click", saveSalesTargetEdit);
}

function closeEditDialog() {
    const dialog = document.getElementById("editDialog");
    dialog.classList.remove("open");
    dialog.setAttribute("aria-hidden", "true");
}

function saveSalesTargetEdit() {
    const morning = Number(document.getElementById("editMorning").value) || 0;
    const night = Number(document.getElementById("editNight").value) || 0;
    const target = Number(document.getElementById("editTarget").value) || 0;
    const commission = document.getElementById("editCommission").value;
    const date = document.getElementById("editDate").value || "mm/dd/yyyy";

    document.getElementById("morningSalesTarget").textContent = morning;
    document.getElementById("nightSalesTarget").textContent = night;
    document.getElementById("dailySalesTarget").textContent = target;
    document.getElementById("commissionTarget").textContent = commission;
    document.getElementById("salesDateTarget").textContent = date;
    document.getElementById("TotalSales").textContent = morning + night;

    closeEditDialog();
    showToast("Sales target updated.");
}

function editHistoryRow(button) {
    const row = button.closest("tr");
    const cells = row.cells;
    const product = cells[0].textContent;
    const quantity = cells[1].textContent;
    const price = cells[2].textContent;
    const total = cells[3].textContent;
    const date = cells[4].textContent;

    document.getElementById("dialogTitle").textContent = "Edit product entry";
    document.getElementById("dialogBody").innerHTML = `
        <label>Product</label>
        <input id="editProduct" type="text" value="${product}">
        <label>Quantity</label>
        <input id="editQuantity" type="number" value="${quantity}">
        <label>Price</label>
        <input id="editPrice" type="number" value="${price}">
        <label>Total</label>
        <input id="editTotal" type="number" value="${total}">
        <label>Date</label>
        <input id="editEntryDate" type="date" value="${date}">
        <div class="modal-actions">
            <button type="button" class="ghost-btn" id="cancelEditBtn">Cancel</button>
            <button type="button" id="saveEntryBtn">Save</button>
        </div>
    `;

    document.getElementById("editDialog").classList.add("open");
    document.getElementById("cancelEditBtn").addEventListener("click", closeEditDialog);
    document.getElementById("saveEntryBtn").addEventListener("click", function() {
        cells[0].textContent = document.getElementById("editProduct").value;
        cells[1].textContent = document.getElementById("editQuantity").value;
        cells[2].textContent = document.getElementById("editPrice").value;
        cells[3].textContent = document.getElementById("editTotal").value;
        cells[4].textContent = document.getElementById("editEntryDate").value || date;
        closeEditDialog();
        showToast("Product entry updated.");
    });
}

function deleteHistoryRow(button) {
    const row = button.closest("tr");
    if (confirm("Delete this product entry?")) {
        row.remove();
        showToast("Product entry deleted.");
    }
}

function addSaleToHistory() {
    var product = document.getElementById("productInput").value;
    var quantity = document.getElementById("quantityInput").value;
    var price = document.getElementById("priceInput").value;
    var total = document.getElementById("totalInput").value;
    var date = document.getElementById("dateInput").value;

    if (product && quantity && price && date) {
        var historyTable = document.getElementById("historyTable").getElementsByTagName('tbody')[0];
        var newRow = historyTable.insertRow(-1);
        
        newRow.insertCell(0).textContent = product;
        newRow.insertCell(1).textContent = quantity;
        newRow.insertCell(2).textContent = price;
        newRow.insertCell(3).textContent = total;
        newRow.insertCell(4).textContent = date;
        const actionCell = newRow.insertCell(5);
        actionCell.innerHTML = '<button type="button" class="inline-action-btn" onclick="editHistoryRow(this)">Edit</button> <button type="button" class="inline-action-btn" onclick="deleteHistoryRow(this)">Delete</button>';

        // Clear input fields after adding to history
        document.getElementById("productInput").value = "";
        document.getElementById("quantityInput").value = "";
        document.getElementById("priceInput").value = "";
        document.getElementById("totalInput").value = "";
        document.getElementById("dateInput").value = "";
        
        showToast("Sale added to history!");
    } else {
        showToast("Please fill in all fields before adding to history.");
    }
}

