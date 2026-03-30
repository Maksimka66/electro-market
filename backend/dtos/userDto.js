export class UserDto {
    id
    email
    isActivated
    activationLink

    constructor(userModel) {
        this.id = userModel.dataValues.id
        this.email = userModel.dataValues.email
        this.role = userModel.dataValues.role
        this.isActivated = userModel.dataValues.isActivated
        this.activationLink = userModel.dataValues.activationLink
    }
}

