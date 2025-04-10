import { Employee } from "../src/model/Employee";
import { EmployeeRepository } from "../src/repository/EmployeeRepository";

async function main(){
    const empRepo = new EmployeeRepository()
    const employees = await empRepo.getAllEmployees()
    console.log(employees)
}

main()