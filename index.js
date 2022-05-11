// Your code here

//takes an array as a parameter and converts information into a singular employee object
function createEmployeeRecord (employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

//takes an array of arrays as a parameter and converts information into aray of employee objects
function createEmployeeRecords(employeesArray) {
    const employeeObjects = [];
    for (const employee of employeesArray) {
        employeeObjects.push({
            firstName: employee[0],
            familyName: employee[1],
            title: employee[2],
            payPerHour: employee[3],
            timeInEvents: [],
            timeOutEvents: []
        });
    }
    return employeeObjects;
}

//creates an objects of date/time information and add it to the array in the object
function createTimeInEvent(employeeObject, dateStamps) {
    const hour = parseInt(dateStamps.slice(11));
    const date = dateStamps.slice(0, 10);

    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    });

    return employeeObject;
}

//creates an objects of date/time information and add it to the array in the object
function createTimeOutEvent(employeeObject, dateStamps) {
    const hour = parseInt(dateStamps.slice(11));
    const date = dateStamps.slice(0, 10);

    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });

    return employeeObject;
}

//finds the given date in the employee infor and calculates time worked that day
function hoursWorkedOnDate(employeeObject, date) {
    let timeIn;
    let timeOut;
    employeeObject.timeInEvents.find((object) => {
        if (object.date === date) {
            timeIn = object.hour;
        }
    });

    employeeObject.timeOutEvents.find((object) => {
        if (object.date === date) {
            timeOut = object.hour;
        }
    });

    return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(employeeObject, date) {
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour;
}

function allWagesFor(employeeObject) {
    //console.log(employeeObject);

    return employeeObject.timeInEvents.reduce((accumulator, object) => {
        let total = wagesEarnedOnDate(employeeObject, object.date);
        return accumulator += total;
    }, 0);

}

function calculatePayroll(employeeObjects) {
    let totalPay = 0;
    for (const employee of employeeObjects) {
        totalPay += allWagesFor(employee);
    }
    
    return totalPay;
}
