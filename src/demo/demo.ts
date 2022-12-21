import { initClientObject } from "./demo.data";
import Client from "../lib/Client";
import User from "../lib/User";


/**
 * 
 * Typescript enhances developer experience in several key ways:
 * 
 * 1. It gives developers choice. Typescript is a superset of Javascript, allowing developers to opt in.
 * 2. It grants object models to developers, allowing developers to navigate and understand objects rapidly.
 * 3. It's safer. Typescript's language server can detect and prevent structural issues embedded in Javascript's language.
 * 
 * 
 */


//hover Client for type definitions
let client = new Client(initClientObject);

//hover createUser for function description
let user: Promise<User> = client.createUser({}, '')

console.log("test");