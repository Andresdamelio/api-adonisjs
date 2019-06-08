'use strict'

const Task = use('App/Models/Task')
class TaskController {
    async index({response}){
        let tasks = await Task.all();
        return response.json(tasks);
    }

    async store({request,response}){
        const task_info = request.only(['task_name']);
        const task = new Task();
        task.task_name = task_info.task_name;
        await task.save();
        return response.status(200).json(task);
    }

    async show({params, response}){
        const task = await Task.find(params.id);
        return response.status(200).json(task);
    }

    async update({params, request, response}){
        const task_info = request.only(['task_name']);
        const task = await Task.find(params.id);

        if( ! task ){
            return response.status(404).json({
                ok:false,
                err:{
                    message: 'El producto no existe'
                }
            });
        }

        task.task_name = task_info.task_name;
        
        await task.save();

        return response.status(200).json(task);

    }
}

module.exports = TaskController
