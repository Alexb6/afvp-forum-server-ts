import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://wecare.prasdev.site',
    'https://wecare.prasdev.site'
  ], // '*' or use an [] to specify multiple & specific origins
  // origin: "https://wecare.prasdev.site",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export default cors(corsOptions);
