// this is a temporary file

import { initClientObject } from "./demo.data";
import Client from "./lib/Client";
import User from "./lib/User";


let client = new Client(initClientObject);

let user: Promise<User> = client.createUser({}, '')