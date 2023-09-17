const data = {
    employees: require("../model/employees.json"),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.status(200).json(data.employees);
}

const addEmployee = (req, res) => {
    if (!req.body || !req.body.firstname || !req.body.lastname) {
        res.status(400).json({
            error: "Missing Parameters."
        })
    }
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        res.status(400).json({ error: "Employee does not exist" });
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee]

    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.status(200).json(employee);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        res.status(400).json({ error: "Employee does not exist" });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    console.log(req.body.id,filteredArray)
    data.setEmployees([...filteredArray])
    res.status(200).json(employee);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        res.status(400).json({ error: "Employee does not exist" });
    }
    res.status(200).json(employee)
}

module.exports = { getEmployee, getAllEmployees, deleteEmployee, addEmployee, updateEmployee }