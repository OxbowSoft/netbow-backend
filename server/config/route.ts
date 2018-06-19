
const routes = [
    {method: 'get', path: '/', actions: (req: any, res: any, dependency: {[x: string]: Object}) => {
        console.log('work')
    }}
];

export default routes;