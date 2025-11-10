
function generateBlankUser()
{
    return             {
            "id": null,
            "email": "",
            "name": "",
            "provider": "",
            "providerId": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
            };
}


function User(rawUser)
{
    rawUser = rawUser||generateBlankUser();

    const self = this;

    self.id = rawUser.id;
    self.email= rawUser.email;
    self.name = rawUser.name;
    self.provider = rawUser.provider;
    self.providerId = rawUser.providerId;
    self.createdAt = rawUser.createdAt;
    self.updatedAt = rawUser.updatedAt;


}

export {User};