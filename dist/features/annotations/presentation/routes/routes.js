"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const presentation_1 = require("../../../../core/presentation");
const presentation_2 = require("../../../../core/presentation");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const infra_1 = require("../../infra");
const infra_2 = require("../../infra");
const makeController = () => {
    const repository = new infra_1.AnnotationRepository();
    const cache = new infra_2.CacheRepository();
    return new controllers_1.AnnotationController(repository, cache);
};
class AnnotationRoutes {
    init(routes) {
        routes.get('/annotations', presentation_2.routerMvcAdapter(makeController(), presentation_1.EMVC.INDEX));
        routes.get('/annotations/:uid', presentation_2.routerMvcAdapter(makeController(), presentation_1.EMVC.SHOW));
        routes.post('/annotations', presentation_2.middlewareAdapter(new middlewares_1.AnnotationMiddleware()), presentation_2.routerMvcAdapter(makeController(), presentation_1.EMVC.STORE));
        routes.put('/annotations/:uid', presentation_2.middlewareAdapter(new middlewares_1.AnnotationMiddleware()), presentation_2.routerMvcAdapter(makeController(), presentation_1.EMVC.UPDATE));
        routes.delete('/annotations:uid', presentation_2.routerMvcAdapter(makeController(), presentation_1.EMVC.DELETE));
    }
}
exports.default = AnnotationRoutes;
