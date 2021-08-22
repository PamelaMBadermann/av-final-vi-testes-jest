"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AnnotationController_repository, _AnnotationController_cache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationController = void 0;
const presentation_1 = require("../../../../core/presentation");
class AnnotationController {
    constructor(repository, cache) {
        _AnnotationController_repository.set(this, void 0);
        _AnnotationController_cache.set(this, void 0);
        __classPrivateFieldSet(this, _AnnotationController_repository, repository, "f");
        __classPrivateFieldSet(this, _AnnotationController_cache, cache, "f");
    }
    async index(request) {
        try {
            const cache = await __classPrivateFieldGet(this, _AnnotationController_cache, "f").get('annotation:all');
            if (cache) {
                return presentation_1.ok(cache);
            }
            const annotation = await __classPrivateFieldGet(this, _AnnotationController_repository, "f").getAll();
            return presentation_1.ok(annotation);
        }
        catch (error) {
            return presentation_1.serverError();
        }
    }
    async show(request) {
        try {
            const { uid } = request.params;
            const cache = await __classPrivateFieldGet(this, _AnnotationController_cache, "f").get(`annotation:${uid}`);
            if (cache) {
                return presentation_1.ok(cache);
            }
            const annotation = await __classPrivateFieldGet(this, _AnnotationController_repository, "f").getOne(uid);
            if (!annotation) {
                return presentation_1.notFound();
            }
            await __classPrivateFieldGet(this, _AnnotationController_cache, "f").set(`anottation:${uid}`, annotation);
            return presentation_1.ok(annotation);
        }
        catch (error) {
            return presentation_1.serverError();
        }
    }
    async store(request) {
        try {
            const annotation = await __classPrivateFieldGet(this, _AnnotationController_repository, "f").create(request.body);
            await __classPrivateFieldGet(this, _AnnotationController_cache, "f").set(`annotation:${annotation.uid}`, annotation);
            await __classPrivateFieldGet(this, _AnnotationController_cache, "f").del('annotation:all');
            return presentation_1.ok(annotation);
        }
        catch (error) {
            return presentation_1.serverError();
        }
    }
    async update(request) {
        try {
            const { uid } = request.params;
            const annotation = await __classPrivateFieldGet(this, _AnnotationController_repository, "f").update(uid, request.body);
            await __classPrivateFieldGet(this, _AnnotationController_cache, "f").set(`annotation:${uid}`, annotation);
            return presentation_1.ok(annotation);
        }
        catch (error) {
            return presentation_1.serverError();
        }
    }
    async delete(request) {
        try {
            const { uid } = request.params;
            await __classPrivateFieldGet(this, _AnnotationController_repository, "f").delete(uid);
            return presentation_1.ok({});
        }
        catch (error) {
            return presentation_1.serverError();
        }
    }
}
exports.AnnotationController = AnnotationController;
_AnnotationController_repository = new WeakMap(), _AnnotationController_cache = new WeakMap();
