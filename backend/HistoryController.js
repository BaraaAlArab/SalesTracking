document.getElementById("exportBtn").addEventListener("click", exportHistoryToCSV);
document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);
document.getElementById("deleteLastEntryBtn").addEventListener("click", deleteLastEntry);

function exportHistoryToCSV() {
    const table = document.getElementById("historyTable");
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let row of table.rows) {
        let rowData = Array.from(row.cells).map(cell => cell.textContent).join(",");
        csvContent += rowData + "\r\n";
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
function clearHistory() {
    if (confirm("Are you sure you want to clear the history? This action cannot be undone.")) {
        localStorage.removeItem("salesHistory");
        location.reload();
    }
}

function deleteLastEntry() {
    let history = JSON.parse(localStorage.getItem("salesHistory")) || [];
    if (history.length > 0) {
        history.pop();
        localStorage.setItem("salesHistory", JSON.stringify(history));
        location.reload();
    } else {
        alert("No entries to delete.");
    }
}