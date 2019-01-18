class RestAPI {
	constructor(req,res,model,findAll_settings,
							  findOne_settings,
							  name=undefined){
		this.name =  model.getTableName().slice(0,-1)
		this.model = model;
		this.req = req;
		this.res = res;
		this.findAll_settings = findAll_settings
		this.findOne_settings = findOne_settings
	}
	findAll(settings){
		this.model.findAll(settings)
			.then(users => this.res.json(users));
	};
	get get_findAll(){
		this.findAll(this.findAll_settings);
	}
	findOne(settings){
		this.findOne_settings["where"] = {
			id: this.req.params.id
		}
		this.model.findOne(settings)
		.then(instance => {
			if (instance){
				this.res.json(instance)
			} else {
				this.res.status(404)
				this.res.json({
					success: false,
					message: `${this.name} not found`
				})
			}
		})
	}
	get get_findOne(){
		this.findOne(this.findOne_settings);
	}
	create(){
		this.model.create({
			...this.req.body
		}).then(instance => this.res.json({
			success: true,
			message: `${this.name}`,
			instance: instance
		})).catch(err => this.res.status(500).send("Something happened"));
	}
	get get_create(){
		this.create();
	}
	update(){
		var settings = 	[
			{...this.req.body},
			{
				where: {
					id: this.req.params.id
				}
			}
		]
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
		this.update()
	}
	delete(){
		var settings = {where: {id:this.req.params.id}}
		this.model.destroy(settings)
		.then(() => this.res.json({
			success: true,
			message: `Deleted ${this.name} if it existed`
		}))
	}
	get get_delete(){
		this.delete()
	}
}

module.exports = RestAPI;