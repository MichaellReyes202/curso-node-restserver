const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (id_token = '') => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  
  //const payload = ticket.getPayload(); // const userid = payload['sub'];
  const { name: nombre,picture: img,email: correo} = ticket.getPayload();

  return { nombre, img,correo };
}
module.exports = {
  googleVerify
}