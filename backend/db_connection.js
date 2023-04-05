import {connect, set} from"mongoose";

(async function(){
 try{
    set("strictQuery", false);
    const db = await connect(process.env.MONGODB_URI_LOCAL);
    console.log("DB connected to",db.connection.name);
  } catch (error){
    console.error(error)
 }
})();