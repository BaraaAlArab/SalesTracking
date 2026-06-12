document.getElementById("Add_sales_targets").addEventListener("click", function() {
    // Get values from the inputs, use 0 if the input is empty
    var morningTarget = Number(document.getElementById("morningSales").value) || 0;
    var nightTarget = Number(document.getElementById("nightSales").value) || 0;
    var dailyTarget = Number(document.getElementById("dailySales").value) || 0;
    var TotalSales = morningTarget + nightTarget;
    var salesDate = document.getElementById("dateInput").value || "mm/dd/yyyy";
    
    if (!document.getElementById("dateInput").value) {
        showToast("Please select a date for the sales targets.");
        return; // Exit the function if date is not selected
    }
// Update the commission target based on the selected percentage from the dropdown
    var commissionSelect = document.getElementById("Commission");
    var commissionRate = commissionSelect.value;
    document.getElementById("commissionTarget").textContent = commissionRate;
    
    // Update the sales targets table   
    document.getElementById("morningSalesTarget").textContent = morningTarget;
    document.getElementById("nightSalesTarget").textContent = nightTarget;
    document.getElementById("dailySalesTarget").textContent = dailyTarget;
    document.getElementById("salesDateTarget").textContent = salesDate;
    document.getElementById("TotalSales").textContent = TotalSales;
    

    showToast("Sales targets updated successfully!");
});

function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

