import { Request, Response } from "express";
import users from "../models/Usuario";

class UsuariosController{

    static postUsuario = (req: Request, res: Response) => {
        let user = new users(req.body);
        user.save((err: any) => {
            if(err){
                res.status(501).send({message: `${err.message} - Failed to register user`})
            } else {
                res.status(201).send(user.toJSON());
            }
        })
    }

    static getUsuarios = (req: Request, res: Response) => {
        try{
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 5;
            const skip = limit * (page - 1);
            users.find((err, users) => {
                try{
                    res.status(200).json(users);
                }catch(err){
                    console.log(err)
                }                
            }).limit(limit).skip(skip);
        } catch(err){
            console.log(err);
        }
    }

    static getUsuarioById = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findById(id, (err: any, user:any) =>{
            if(err){
                res.status(404).send({message:  "Id not finded"});
            } else {
                res.status(200).send(user);
            }
        })            
    }

    static  getUsuarioCPF  = (req: Request, res: Response) => {
        const id_cpf = req.params.id;
        users.find({'id_cpf': id_cpf}, (err: any, item : any) => {
            if(err){
                return res.status(404);
            } else {
                if(item.length === 0){
                    res.send({message: 'user not find'})
                } else {
                    res.send(item);
                }
                
            }
        })};

    static updateUsuario = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findOneAndUpdate({id_cpf: id} , {$set: req.body}, {returnOriginal: false}, (err: any, item:any) => {
            if(!err){
                res.send(item).status(204);
                
            } else {
                res.status(404).send({message: err.message})
            }
        })
    }

    static deleteUsuario = (req: Request, res: Response) => {
        const id = req.params.id;
        users.findByIdAndDelete(id, (err:any) => {
            if(!err){
                
                res.status(204).send({message: 'User successfully deleted'});
            } else {
                res.status(404).send({message: err.message});
            }
        })
    }
}

export default UsuariosController
