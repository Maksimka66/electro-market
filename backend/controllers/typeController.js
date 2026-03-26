import { models } from '../models/models.js'

export async function getAllTypes(req, res) {
    const types = await models.Type.findAll()

    return res.json(types)
}

export async function createType(req, res) {
    const { name } = req.body

    const type = await models.Type.create({ name })

    return res.status(201).json(type)
}

