import * as firebaseAdmin from 'firebase-admin';
const serviceAccount = require('./config.json');
const USERS = 'Users';

export default class Firebase implements IDatabase{
    private admin: firebaseAdmin.app.App;
    db: FirebaseFirestore.Firestore;

    constructor() {
        this.init();
    }

    private initFirestore():void {
        this.db = this.admin.firestore();
    }

    init():void {
        this.admin = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: "https://netbow-3248f.firebaseio.com"
        });
        this.initFirestore();
        console.log('Firebase init');
    }

    createUser(uid): Promise<FirebaseFirestore.WriteResult> {
        const clearUser = {
            actuallyWatch: [],
            watched: [],
            favorite: []
        }

        return this.db.collection(USERS).doc(uid).set(clearUser);
    }

    getUser(uid): Promise<FirebaseFirestore.DocumentSnapshot> {
        return this.db.collection(USERS).doc(uid).get();
    }
}
