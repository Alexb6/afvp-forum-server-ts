import errorHandler from '../middlewares/errorHandler';
import env from './env';
import { Server } from '@overnightjs/core';
import routes from '../modules';

class App extends Server {
  constructor(
    // routes: Record<string, unknown>[],
    middlewares: Record<string, unknown>
  ) {
    super();

    this.initializeMiddlewares(middlewares);
    super.addControllers(routes);
    this.initializeErrorHandler();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initializeMiddlewares(middlewares: any) {
    for (const key in middlewares) {
      if (key === 'cors') {
        this.app.options('*', middlewares[key]);
        this.app.use(middlewares[key]);
      } else this.app.use(middlewares[key]);
    }
  }

  initializeErrorHandler() {
    this.app.use(errorHandler);
  }

  start(port: string) {
    this.app.listen(port, async () => {
      console.log('The server started on port ' + port);
      console.log('The app environment is ' + env.node_env);
    });
  }
}

export default App;
