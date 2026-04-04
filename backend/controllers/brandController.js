import { Brand } from '../src/modules/brand/brand.model.js'

export async function getAllBrands(req, res) {
    const brands = await Brand.findAll()

    return res.json(brands)
}

export async function createBrand(req, res) {
    const { name } = req.body

    const brand = await Brand.create({ name })

    return res.status(201).json(brand)
}

