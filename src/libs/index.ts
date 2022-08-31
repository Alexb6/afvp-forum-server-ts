import env from '../config/env';
import JwtService from './jwt';

// services dependencies
import jwt from 'jsonwebtoken';

// Instanciate all your singleton service with dépendencies injection
const jwtService = new JwtService(jwt, env.jwt_secret as string);

// export all the libs services
export { jwtService };
