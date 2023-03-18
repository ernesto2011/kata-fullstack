import server from "./server.js";
import { connect } from "./database.js";
connect()


server.start({port: 3001},({port})=>{
    console.log('Server is running on port ' + port);
})