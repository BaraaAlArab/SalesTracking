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

document.getElementById("clearTargetBtn").addEventListener("click", function() {
    //if confirm("Are you sure you want to clear the sales targets?") 
    if (confirm("Are you sure you want to clear the sales targets?")) {
        // Clear the sales targets table
        document.getElementById("morningSalesTarget").textContent = "0";
        document.getElementById("nightSalesTarget").textContent = "0";
        document.getElementById("dailySalesTarget").textContent = "0";
        document.getElementById("salesDateTarget").textContent = "mm/dd/yyyy";
        document.getElementById("TotalSales").textContent = "0"; 
        document.getElementById("commissionTarget").textContent = "0%";
    }
    else {
        // User clicked "Cancel", do nothing
        return;
    }
    // Clear the input fields
    document.getElementById("morningSales").value = "";
    document.getElementById("nightSales").value = "";
    document.getElementById("dailySales").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("commissionTarget").textContent = "0%";
    document.getElementById("morningSalesTarget").textContent = "0";
    document.getElementById("nightSalesTarget").textContent = "0";
    document.getElementById("dailySalesTarget").textContent = "0";
    document.getElementById("salesDateTarget").textContent = "mm/dd/yyyy";
    document.getElementById("TotalSales").textContent = "0"; 
    
});
