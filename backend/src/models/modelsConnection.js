import { User } from './user/user.model.js'
import { Basket } from './basket/basket.model.js'
import { BasketDevice } from './basketDevice/basketDevice.model.js'
import { Token } from './token/token.model.js'
import { Brand } from './brand/brand.model.js'
import { Rating } from './rating/rating.model.js'
import { Type } from './type/type.model.js'
import { Device } from './device/device.model.js'
import { TypeBrand } from './typeBrand/typeBrand.model.js'
import { DeviceInfo } from './deviceInfo/deviceInfo.model.js'

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {
    as: 'info'
})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {
    through: TypeBrand
})
Brand.belongsToMany(Type, {
    through: TypeBrand
})

