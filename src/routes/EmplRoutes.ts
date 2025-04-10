import express, { Application } from "express";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { EmployeeController } from "../controllers/EmployeeController";

export class EmplRoutes {

    private app: Application;
    private router = express.Router();
    private employeeController = new EmployeeController();

    constructor(app: Application) {
        this.app = app;
        this.router.use(express.json());
        this.app.use("/employees", this.router)
    }

    public loadRoutes() {    
        this.router.get("/", async (req, res) => {
                this.employeeController.getAllEmployees(req, res)
            }
        );
        this.router.get("/:id", async (req, res) => {
                this.employeeController.getEmployeeById(req, res)
            }
        );
        this.router.post("/", async (req, res) => {
                this.employeeController.addEmployee(req, res)
            }
        );
        this.router.put("/:id", async (req, res) => {
                this.employeeController.updateEmployeePosition(req, res)
            }       
        );
        this.router.delete("/:id", async (req, res) => {
                this.employeeController.deleteEmployee(req, res)
            }       
        );
    }   
}