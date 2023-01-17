export function checkOptions(headerObj: any, options: any): any;
export function instantiateUser({ data, headerObj, client }: {
    data: any;
    headerObj: any;
    client: any;
}): Promise<User>;
import User = require("../lib/User");
