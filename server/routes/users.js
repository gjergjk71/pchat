var User = require("../models").User;
var router = require("express").Router();
const middleware = require("../middleware");

class RestAPI {
	constructor(req,res,model,findAll_settings,
							  findOne_settings,
							  update_settings,
							  delete_settings,
							  name=undefined){
		this.name = name || model.getTableName()
		this.model = model;
		this.req = req;
		this.res = res;
		this.findAll_settings = findAll_settings
		this.findOne_settings = findOne_settings
		this.update_settings = update_settings
		this.delete_settings = delete_settings
	}
	findAll(settings){
		this.model.findAll(settings)
			.then(users => this.res.json(users));
	};
	get get_findAll(){
		this.findAll(this.findAll_settings);
	}
	findOne(settings){
		this.model.findOne(settings)
		.then(instance => {
			if (instance){
				this.res.json(instance)
			} else {
				this.res.status(404)
				this.res.json({
					success: false,
					message: `${this.name.slice(0,-1)} not found`
				})
			}
		})
	}
	get get_findOne(){
		this.findOne(this.findOne_settings);
	}
	update(settings){
		this.model.update(settings[0],settings[1])
		.then((instance) => {
			if (instance){
				this.res.json({
					success: true,
					message: "Successfully updated",
					instance: instance
				})
			} else {
				this.res.status(404);
				return this.res.json({
					success: false,
					message: `${this.name} not found`
				})
			}
		})
	}
	get get_update(){
		this.update(this.update_settings)
	}
	delete(settings){
		this.model.destroy(settings)
		.then(() => this.res.json({
			success: true,
			message: `Deleted ${this.name.slice(0,-1)} if it existed`
		}))
	}
	get get_delete(){
		this.delete(this.delete_settings)
	}

}
findAll_settings  = {
	attributes: {
		exclude: ["password"]
	}
}
findOne_settings = {
	attributes: {
		exclude: ["password"]
	}
}

