import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { CustomError } from '../src/errorHandlers/apiErrors.js'
import { __dirname } from '../src/configs/config.js'
import { Device } from '../src/models/device/device.model.js'
import { DeviceInfo } from '../src/models/deviceInfo/deviceInfo.model.js'

export async function getAllDevices(req, res) {
    const { brandId, typeId } = req.body
    let { limit, page } = req.body

    page = page || 1
    limit = limit || 9

    let offset = limit * page - limit

    if (!brandId && !typeId) {
        const devices = await Device.findAndCountAll({
            limit,
            offset
        })

        return res.json(devices)
    }

    if (!brandId && typeId) {
        const devices = await Device.findAndCountAll({
            where: {
                typeId
            },
            limit,
            offset
        })

        return res.json(devices)
    }

    if (brandId && !typeId) {
        const devices = await Device.findAndCountAll({
            where: {
                brandId
            },
            limit,
            offset
        })

        return res.json(devices)
    }

    if (brandId && typeId) {
        const devices = await Device.findAndCountAll({
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

    const device = await Device.findOne({
        where: {
            id
        },
        include: [
            {
                model: DeviceInfo,
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

        const device = await Device.create({ name, price, brandId, typeId, img: fileName })

        if (info) {
            info = JSON.parse(info)

            info.forEach(({ title, description }) =>
                DeviceInfo.create({
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

