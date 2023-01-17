import { IUserObject } from '../interfaces/user';
import Client from '../lib/Client';
import User from '../lib/User';
export declare const checkOptions: (headerObj: any, options: any) => any;
export declare const instantiateUser: ({ data, headerObj, client }: {
    data: IUserObject;
    headerObj: any;
    client: Client;
}) => Promise<User>;
