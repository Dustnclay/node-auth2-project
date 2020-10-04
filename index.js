const server= require('./api/server')

const port = 5000;
server.listen(port, () => console.log(`We're live on port ${port}`))