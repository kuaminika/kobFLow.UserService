
function generateBlankUser()
{
    return             {
            "id": null,
            "email": "",
            "name": "",
            "provider": "",
            "providerUserId": "",
            "memberSince": new Date(),
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
    self.orgId = rawUser.orgId;
    self.provider = rawUser.provider;
    self.providerUserId = rawUser.providerUserId;
    self.memberSince = rawUser.memberSince;
    self.updatedAt = rawUser.updatedAt;


}

export {User};