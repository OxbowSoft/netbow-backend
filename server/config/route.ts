import User from "../controllers/Users/User";

const routes = [
    {method: 'post', path: '/createUser', actions: (req: any, res: any, dependency: any) => {
        new User({req, res}, dependency).createUser();
    }},
    {method: 'post', path: '/getUser', actions: (req: any, res: any, dependency: any) => {
        new User({req, res}, dependency).getUser();
    }}
];

export default routes;