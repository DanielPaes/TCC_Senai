import { Request, Response } from "express";
import tasks from "../models/Paciente";

class PacientesController{
    static postPaciente = (req: Request, res: Response) => {
        let task = new tasks(req.body);
        task.save((err: any) => {
            if(err){
                res.status(501).send({message: `${err.message} - Failed to register task`})
            } else {
                res.status(201).send(task.toJSON())
            }
        })
    }

    static getPacientes = (req: Request, res: Response) => {
        try{
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 3;
            const skip = limit * (page - 1);
            tasks.find((err, tasks) => {
                try{
                    res.status(200).json(tasks);
                }catch(err){
                    console.log(err)
                }                
            }).limit(limit).skip(skip);
        } catch{
        }
}

static getPacienteById = (req: Request, res: Response) => {
    const id = req.params.id;
    tasks.findById(id, (err: any, task:any) =>{
        if(err){
            res.status(404).send({message: `Id not finded`})
        } else {
            res.status(200).send(task);
        }
    })            
}

    static  getPacienteCPF  = (req: Request, res: Response) => {
        const id_cpf = req.params.id;
        tasks.find({'id_cpf': id_cpf}, (err: any, item : any) => {
            if(err){
                return res.status(404);
            } else {
                if(item.length === 0){
                    res.send({message: 'user not find'})
                } else {
                    res.send(item);
                }
                
            }
        });
        
        // tasks.findById(id, (err: any, task:any) =>{
        //     if(err){
        //         res.status(404).send({message: `Id not finded`})
        //     } else {
        //         res.status(200).send(task);
        //     }
        // })            
    }

    // static updatePaciente = (req: Request, res: Response) => {
    //     const id = req.params.id;
    //     tasks.findByIdAndUpdate(id, {$set: req.body}, (err: any) => {
    //         if(!err){
    //             res.status(200).send({message: 'Task sucessfully updated'})
    //         } else {
    //             res.status(404).send({message: err.message})
    //         }
    //     })
    // }

    static updatePaciente = (req: Request, res: Response) => {
        const id = req.params.id;
        tasks.findOneAndUpdate({id_cpf: id} , {$set: req.body}, {returnOriginal: false}, (err: any, item:any) => {
            if(!err){
                res.send(item).status(204);
                
            } else {
                res.status(404).send({message: err.message})
            }
        })
    }

    static deletePaciente = (req: Request, res: Response) => {
        const id = req.params.id;
        tasks.findByIdAndDelete(id, (err:any) => {
            if(!err){
                res.send({message: 'Task successfully deleted'});
            } else {
                res.status(404).send({message: err.message});
            }
        })
    }
}

export default PacientesController
