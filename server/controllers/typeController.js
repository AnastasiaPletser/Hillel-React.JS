import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

// module.exports = new TypeController()
export default new TypeController()
