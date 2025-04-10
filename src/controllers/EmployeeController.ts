import { EmployeeRepository } from "../repository/EmployeeRepository";
import { Request, Response } from "express";


export class EmployeeController{

    private empRepo = new EmployeeRepository()

    public async getAllEmployees(req: Request, res: Response){
        try {
            const employees = await this.empRepo.getAllEmployees()
            res.send(employees)
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }

    public async getEmployeeById(req: Request, res: Response){
        const id = parseInt(req.params.id)
        try {
            const employee = await this.empRepo.getEmployeeById(id)
            if (employee) {
                res.send(employee)
            } else {
                res.status(404).send({ message: "Employee not found" })
            }
        } catch (error) {
            console.error("Error fetching employee by ID:", error);
            throw error;
        }
    }

    public async addEmployee(req: Request, res: Response){
        const employee = req.body
        try {
            await this.empRepo.addEmployee(employee)
            res.status(201).send({ message: "Employee added successfully" })
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    }

    public async updateEmployeePosition(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const position = req.body.position
        try {
            await this.empRepo.updateEmployeePosition(id, position)
            res.send({ message: "Employee position updated successfully" })
        } catch (error) {
            console.error("Error updating employee position:", error);
            throw error;
        }
    }

    public async deleteEmployee(req: Request, res: Response){
        const id = parseInt(req.params.id)
        try {
            await this.empRepo.deleteEmployee(id)
            res.send({ message: "Employee deleted successfully" })
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
}