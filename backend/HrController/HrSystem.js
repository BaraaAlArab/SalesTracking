document.getElementById('add-employee-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    // Get values from the form inputs
    const name = document.getElementById('employee-name').value;
    const position = document.getElementById('employee-position').value;
    const department = document.getElementById('employee-department').value;
    const salary = document.getElementById('employee-salary').value;
    const startDate = document.getElementById('employee-start-date').value;
    
    // Get the selected text for status (e.g. Married/Single or whatever the user changes it to)
    const statusSelect = document.getElementById('status');
    const statusText = statusSelect.options[statusSelect.selectedIndex].text;
    // 1. Add to Employee Management Table
    const employeeListTbody = document.querySelector('#employee-list table tbody');
    const employeeRow = document.createElement('tr');
    employeeRow.innerHTML = `
        <td>${name}</td>
        <td>${position}</td>
        <td>${department}</td>
    `;
    employeeListTbody.appendChild(employeeRow);
    // 2. Add to Attendance Tracking Table
    const attendanceTbody = document.querySelector('#attendance-tracking table tbody');
    const attendanceRow = document.createElement('tr');
    attendanceRow.innerHTML = `
        <td>${startDate}</td>
        <td>${name}</td>
        <td>${statusText}</td>
    `;
    attendanceTbody.appendChild(attendanceRow);
    // 3. Add to Payroll Table
    const payrollTbody = document.querySelector('#payroll table tbody');
    const payrollRow = document.createElement('tr');
    
    // Format salary as currency
    const formattedSalary = '$' + parseFloat(salary).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    payrollRow.innerHTML = `
        <td>${name}</td>
        <td>${formattedSalary}</td>
        <td>${startDate}</td>
    `;
    payrollTbody.appendChild(payrollRow);
    // Reset the form after submission
    this.reset();
});

document.getElementById('Rest_Btn').addEventListener('click', function(event) {
    event.preventDefault();

    const name = document.getElementById('employee-name').value.trim();

    if (!name) {
        alert('Fill in the employee details you want to deactivate first.');
        return;
    }

    const removeMatchingRows = (tbodySelector, columnIndex, targetValue) => {
        const rows = document.querySelectorAll(`${tbodySelector} tr`);
        let removedCount = 0;

        for (const row of rows) {
            const cells = Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent.trim());

            if (cells[columnIndex] === targetValue) {
                row.remove();
                removedCount += 1;
            }
        }

        return removedCount;
    };

    const removedFromEmployeeList = removeMatchingRows('#employee-table-body', 0, name);
    const removedFromAttendance = removeMatchingRows('#attendance-table-body', 1, name);
    const removedFromPayroll = removeMatchingRows('#payroll-table-body', 0, name);

    if (!removedFromEmployeeList && !removedFromAttendance && !removedFromPayroll) {
        alert('No employee with that name was found in the tables.');
        return;
    }

    document.getElementById('add-employee-form').reset();
});