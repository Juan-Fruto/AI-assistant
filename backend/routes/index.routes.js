import {Router} from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = new Router();

// current directory in string type
const pathRouter = path.dirname(fileURLToPath(import.meta.url));

// only retuns the filename without the extension
const removeExtension = (f) => f.split('.')[0];

// readdSync function takes the file names in the path
fs.readdirSync(pathRouter).filter(async (f) => {
    const filesIgnored = ['index'];
    const fileName = removeExtension(f);

    if(!filesIgnored.includes(fileName)){
      const routerName = await import(`./${f}`);

      console.log('-->', fileName);
      //setting the endpoint and the routes
      router.use(`/${fileName}`, routerName.default );

    }
  });

export default router;

