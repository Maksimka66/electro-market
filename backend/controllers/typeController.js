import { Type } from '../src/models/type/type.model.js'

export async function getAllTypes(req, res) {
    const types = await Type.findAll()

    return res.json(types)
}

export async function createType(req, res) {
    const { name } = req.body

    const type = await Type.create({ name })

    return res.status(201).json(type)
}

