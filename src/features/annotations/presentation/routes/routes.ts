import { Router } from'express';
import { EMVC } from '../../../../core/presentation';
import { middlewareAdapter, routerMvcAdapter } from '../../../../core/presentation';
import { AnnotationController } from '../controllers';
import { AnnotationMiddleware, UserExistentMiddleware } from '../middlewares';
import { MVCController } from '../../../../core/presentation';
import { AnnotationRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new AnnotationRepository();
    const cache = new CacheRepository();
    return new AnnotationController(repository, cache);
};

export default class AnnotationRoutes {
    public init(routes: Router) {
       routes.get('/annotations', 
              routerMvcAdapter(makeController(), EMVC.INDEX));

       routes.get('/annotations/:uid', 
              routerMvcAdapter(makeController(), EMVC.SHOW));

       routes.post('/annotations', 
              [
                     middlewareAdapter(new AnnotationMiddleware()),
                     middlewareAdapter(new UserExistentMiddleware()),
              ],
              routerMvcAdapter(makeController(), EMVC.STORE));
        
       routes.put('/annotations/:uid',
              middlewareAdapter(new AnnotationMiddleware()),
              routerMvcAdapter(makeController(), EMVC.UPDATE));
        
       routes.delete('/annotations:uid',
              routerMvcAdapter(makeController(), EMVC.DELETE));
    }
}