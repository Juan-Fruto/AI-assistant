import Router from 'express';
import { loginHandler, signupHandler } from '../controllers/auth.controller.js';
import initToken from '../middlewares/initToken.js';
import loginValidators from '../validators/login.js';
import singupValidators from '../validators/singup.js';
import api from 'api';

const router = new Router();

router.post('/login', loginValidators, loginHandler);

router.post('/createUser', singupValidators, signupHandler);

const techspecs_key = process.env.TECH_SPECS_API_KEY;

router.get('/devices', async (req, res) => {

  try {
    const sdk = api('@techspecs/v4.0#c00z1gqlhvno03e');
    
    const { data } = await sdk.productDetail({
      productId: '642d4722c835681cc135fbf8',
      'accept-encoding': '',
      authorization: techspecs_key,
    });

    const allSpecs = data.data.items[0];

    const specs = {
      model: allSpecs.product.model,
      image: allSpecs.image.front,
      cpu: allSpecs.inside.processor.cpu,
      ram: allSpecs.inside.ram.capacity,
      storage: allSpecs.inside?.storage?.capacity?.split(', ') || "None",
      displaySize: allSpecs.display.diagonal.split(', ')[1],
      displayType: allSpecs.display?.type || "None",
      cameras: (parseInt(Object.keys(allSpecs.camera).length) - 1).toString(),
      mainCamera: allSpecs.camera.back_camera.resolution,
      battery: allSpecs.inside.battery.capacity,
      released: allSpecs.date.released
    }
    
    res.json(specs);
  } catch (err) {
    console.error(err);
  }
  
})

export default router;