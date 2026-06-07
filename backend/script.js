// Attach the event listener to the "Calculate" button
document.getElementById("calculateBtn").addEventListener("click", calculateSales);
// Optional: Add event listener for the Reset button
document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("morningSales").value = "";
    document.getElementById("nightSales").value = "";
    document.getElementById("dailySales").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("MorningResult").textContent = "";
    document.getElementById("NightResult").textContent = "";
    document.getElementById("DailyResult").textContent = "";
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
    }

    // Update the result paragraphs
    document.getElementById("MorningResult").textContent = "Morning Sales: " + morningSales + " | Commission (" + commissionRate + "): " + morningComm.toFixed(2);
    document.getElementById("NightResult").textContent = "Night Sales: " + nightSales + " | Commission (" + commissionRate + "): " + nightComm.toFixed(2);
    document.getElementById("DailyResult").textContent = "Total Daily Sales: " + totalSales + " | Total Commission/Bonus: " + result.toFixed(2);
}


function calculateQuantity() {
    var price = Number(document.getElementById("priceInput").value) || 0;
    var quantity = Number(document.getElementById("quantityInput").value) || 0;
    var total = price * quantity;
    document.getElementById("totalInput").value = total.toFixed(2);
}



function addSaleToHistory() {
    var product = document.getElementById("productInput").value;
    var quantity = document.getElementById("quantityInput").value;
    var price = document.getElementById("priceInput").value;
    var total = document.getElementById("totalInput").value;
    var date = document.getElementById("dateInput").value;

    if (product && quantity && price && date) {
        var historyTable = document.getElementById("historyTable");
        var newRow = historyTable.insertRow(-1);
        
        newRow.insertCell(0).textContent = product;
        newRow.insertCell(1).textContent = quantity;
        newRow.insertCell(2).textContent = price;
        newRow.insertCell(3).textContent = total;
        newRow.insertCell(4).textContent = date;

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

