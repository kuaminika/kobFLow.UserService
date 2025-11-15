function QueryHolder() {
    const self = this;
    self.getUserByIdQuery = `select   u.id,
                            u.ord_id orgId,
                            email,
                            u.name,
                            u.created_at createdAt,
                            provider, 
                            provider_user_id providerUserId
                                from user u 
                            left  join user_identities ui on u.id = ui.user_id
                            where u.id = ?`;

    self.getUserByEmailQuery = `select   u.id,
                            u.ord_id orgId,
                            email,
                            u.name,
                            u.created_at createdAt,
                            provider, 
                            provider_user_id providerUserId
                                from user u 
                            left  join user_identities ui on u.id = ui.user_id
                            where u.email = ?`;
    self.addUserQuery = `insert into user (email, name, created_at,ord_id) values (?, ?, ?, ?)`;
    self.addUserIdentityQuery = `insert into user_identities (user_id, provider, provider_user_id) values (?, ?, ?)`;
    self.updateUserQuery = `update user set name = ?, email = ?  where id = ?`;
    self.updateUserIdentityQuery = `update user_identities set provider = ?, provider_user_id = ? where user_id = ?`;

}

export { QueryHolder };