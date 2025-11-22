function DBGatewayArgs(args)
{
    args = args||{host:"",user:"",database:"", password:""}

    this.host = args.host;
    this.user = args.user;
    this.database = args.database;
    this.password = args.password;
}

export default DBGatewayArgs;