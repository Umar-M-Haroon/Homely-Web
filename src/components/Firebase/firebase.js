import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.db.enablePersistence()
        .catch(err =>{
            console.log("Error setting persistence");
            console.log(err);
        });
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    userID = () => this.auth.currentUser.uid;

    homes = () => {
        return this.db.collection('Homes').where("userIDs", "array-contains", this.auth.currentUser.uid).get();
    }

    handleSignInWithApple = () => {
        var provider = new app.auth.OAuthProvider('apple.com');
        provider.addScope('name');
        this.auth.signInWithRedirect(provider)
        .then( (result) =>{
            console.log(result.user);
        })
        .catch( (error) =>{

        });
    }
}
export default Firebase