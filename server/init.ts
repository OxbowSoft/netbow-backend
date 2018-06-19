import App from './config/index';
import dependency from './config/dependency';
const port = 3000;

new App(dependency).express.listen(port, (err) => {
    if(err) {
        return console.log(err);
    }

    return console.log(`server is listening on ${port}`);
});