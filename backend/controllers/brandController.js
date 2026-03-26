import { models } from '../models/models.js'

export async function getAllBrands(req, res) {
    const brands = await models.Brand.findAll()

    return res.json(brands)
}

export async function createBrand(req, res) {
    const { name } = req.body

    const brand = await models.Brand.create({ name })

    return res.status(201).json(brand)
}

