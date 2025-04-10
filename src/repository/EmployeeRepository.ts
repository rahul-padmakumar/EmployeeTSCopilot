import { createPool } from "mysql2";
import { dbConfig } from "../config/dbConfig";
import { Employee } from "../model/Employee";


export class EmployeeRepository{
    private connection = createPool(dbConfig)

    public async getAllEmployees(): Promise<Employee[]> {
        try {
            const [rows]: any = await this.connection.promise().query("SELECT * FROM employees");
            return rows as Employee[];
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }

    public async getEmployeeById(id: number): Promise<Employee | undefined> {
        try {
            const [rows]: any = await this.connection.promise().query("SELECT * FROM employees WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : undefined;
        } catch (error) {
            console.error("Error fetching employee by ID:", error);
            throw error;
        }
    }

    public async addEmployee(employee: Employee): Promise<void> {
        try {
            await this.connection.promise().query("INSERT INTO employees (first_name, last_name, hire_date, position) VALUES (?, ?, ?, ?)", [employee.firstName, employee.lastName, employee.hireDate, employee.position]);
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    }

    public async updateEmployeePosition(id: number, position: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE employees SET position = ? WHERE id = ?", [position, id], (error: any) => {
                if (error) {
                    console.error("Error updating employee position:", error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public async deleteEmployee(id: number): Promise<void> { 
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM employees WHERE id = ?", [id], (error: any) => {
                if (error) {
                    console.error("Error deleting employee:", error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}