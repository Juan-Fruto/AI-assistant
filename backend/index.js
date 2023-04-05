import app from './app.js';
import './db_connection.js';

// runnig server
app.listen(app.get("PORT"), () => console.log(`server listening on port ${app.get("PORT")}`));