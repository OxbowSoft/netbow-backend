import Controller from "../../core/controllers";

export default class User extends Controller{
    constructor(server ,dependency) {
        super(server, dependency);
    }

    createUser() {
        const uid = this.server.req.body.uid; 

        this.dependency.firebase.createUser(uid)
            .then(() => {
                this.server.res.send('work');
            })
    }

    getUser() {
        const uid = this.server.req.body.uid;

        this.dependency.firebase.getUser(uid)
            .then((response) => {
                const user = {
                    actuallyWatch: response._fieldsProto.actuallyWatch.arrayValue.values,
                    watched: response._fieldsProto.watched.arrayValue.values,
                    favorite: response._fieldsProto.favorite.arrayValue.values
                }

                this.server.res.send(user);
            })
    }
}
