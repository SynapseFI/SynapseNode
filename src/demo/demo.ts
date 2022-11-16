import { initClientObject } from "./demo.data";
import Client from "../lib/Client";
import User from "../lib/User";


//hover Client for type definitions
let client = new Client(initClientObject);

//hover createUser for function description
let user: Promise<User> = client.createUser({}, '')