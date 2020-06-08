import Masto, { GatewayConstructorParams } from 'masto';

/**
 * Generate Masto instance with param
 * @param params Masto login method's args. see https://neet.github.io/masto.js/classes/_clients_masto_masto_.masto.html#login
 */
export default function masto(params: GatewayConstructorParams) {
  return Masto.login(params)
    .then((instance) => {
      return instance;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject('Instance not found');
    });
}
