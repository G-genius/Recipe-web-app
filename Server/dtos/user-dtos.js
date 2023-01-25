module.exports = class UserDto {
    email;
    city;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email
        this.city = model.city
        this.id = model._id
        this.isActivated = model.isActivated
    }
}