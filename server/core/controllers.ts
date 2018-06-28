export default class Controller {
    constructor( protected server: {req: any, res: any}, protected dependency: any) {}
}