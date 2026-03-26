import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { models } from '../models/models.js'
import { CustomError } from '../errorHandlers/apiErrors.js'
import { __dirname } from '../config.js'

export async function getAllDevices(req, res) {
    const { brandId, typeId } = req.body
    let { limit, page } = req.body

    page = page || 1
    limit = limit || 9

    let offset = limit * page - limit

    if (!brandId && !typeId) {
        const devices = await models.Device.findAndCountAll({
            limit,
            offset
        })

        return res.json(devices)
    }

    if (!brandId && typeId) {
        const devices = await models.Device.findAndCountAll({
            where: {
                typeId
            },
            limit,
            offset
        })

        return res.json(devices)
    }

    if (brandId && !typeId) {
        const devices = await models.Device.findAndCountAll({
            where: {
                brandId
            },
            limit,
            offset
        })

        return res.json(devices)
    }

    if (brandId && typeId) {
        const devices = await models.Device.findAndCountAll({
            where: {
                brandId,
                typeId
            },
            limit,
            offset
        })

        return res.json(devices)
    }
}

export async function getOneDevice(req, res) {
    const { id } = req.params

    const device = await models.Device.findOne({
        where: {
            id
        },
        include: [
            {
                model: models.DeviceInfo,
                as: 'info'
            }
        ]
    })

    return res.json(device)
}

export async function createDevice(req, res, next) {
    try {
        const { name, price, brandId, typeId } = req.body
        const { img } = req.files

        let { info } = req.body

        const fileName = `${uuidv4()}.jpg`

        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const device = await models.Device.create({ name, price, brandId, typeId, img: fileName })

        if (info) {
            info = JSON.parse(info)

            info.forEach(({ title, description }) =>
                models.DeviceInfo.create({
                    title,
                    description,
                    deviceId: device.id
                })
            )
        }

        return res.status(201).json(device)
    } catch (e) {
        next(CustomError.badRequest(e.message))
    }
}

