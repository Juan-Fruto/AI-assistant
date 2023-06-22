import api from 'api';

const techspecs_key = process.env.TECH_SPECS_API_KEY; 
const sdk = api('@techspecs/v4.0#c00z1gqlhvno03e');

export const search = async (input) => {
  try {

    const response = await sdk.searchProducts({
      query: input,
      authorization: techspecs_key
    })

    console.log("🚨Call🚨");
    
    if(response.status === !200) return "Not Found";

    const items = response.data.data.items;

    const devices = items.map(device => ({
      id: device.product.id,
      model: device.product.model,
      image: device.image.front,
    }));

    return devices.slice(0, 7);

  } catch (error) {
      console.error('error', error);
  }
}

export const specs = async (deviceId) => {
  try {
    
    const response = await sdk.productDetail({
      productId: deviceId,
      'accept-encoding': '',
      authorization: techspecs_key,
    });

    if(response.status === !200) return "An error occurred";

    const { data } = response;

    const allSpecs = data.data.items[0];
    // const [allSpecs] = data.data.items;

    const specs = {
      model: allSpecs.product.model || "No information",
      image: allSpecs.image?.front || "No information",
      cpu: allSpecs.inside.processor.cpu || "No information",
      ram: allSpecs.inside.ram.capacity || "No information",
      storage: allSpecs.inside?.storage?.capacity || "No information",
      //storage: allSpecs.inside?.storage?.capacity?.split(', ') || "No information",
      displaySize: allSpecs.display.diagonal.split(', ')[1] || "No information",
      displayType: allSpecs.display?.type || "No information",
      cameras: (parseInt(Object.keys(allSpecs.camera).length) - 1).toString() || "No information",
      mainCamera: allSpecs.camera.back_camera.resolution || "No information",
      battery: allSpecs.inside.battery.capacity || "No information",
      released: allSpecs.date.released || "No information"
    }
    
    return specs;
  } catch (err) {
    console.error(err);
  }
}