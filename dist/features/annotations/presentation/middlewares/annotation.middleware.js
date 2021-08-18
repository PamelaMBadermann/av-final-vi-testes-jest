"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationMiddleware = void 0;
const presentation_1 = require("../../../../core/presentation");
const presentation_2 = require("../../../../core/presentation");
class AnnotationMiddleware {
    constructor() {
        this.fields = ['title', 'userUID'];
    }
    async handle(request) {
        const body = request.body;
        for (const field of this.fields) {
            const error = new presentation_2.RequireFieldsValidator(field).validate(body);
            if (error) {
                return presentation_1.badRequest(error);
            }
        }
        return presentation_1.ok({});
    }
}
exports.AnnotationMiddleware = AnnotationMiddleware;
// export default async function AnottationUidNonExistent(request: Request, response: Response, next: NextFunction) {
//     const { uid } = request.params;
//     const extistentUid = await Anottation.findOne({ uid: uid });
//     if (!extistentUid) {
//         return response.status(404).json({
//             mensagem: "Esse Id de recado não existe."
//         });
//     }
//     next();
// }
// export default async function FillAnottation(request: Request, response: Response, next: NextFunction) {
//     const { title, description } = request.body;
//     if (!title || !description) {
//         return response.status(400).json({
//             mensagem: "Necessário preenchimento dod campos TÍTULO e DESCRIÇÃO para prosseguir."
//         });
//     }
//     next();
// } 
// export default async function LengthDescriptionAnottation(request: Request, response: Response, next: NextFunction) {
//     const { description } = request.body;
//     if (description > 150 ) {
//         return response.status(400).json({
//             mensagem: "Descrição não pode ultrapassar 50 caracteres."
//         })
//     }
// } 
// export default async function LengthTitleAnottation(request: Request, response: Response, next: NextFunction) {
//     const { title } = request.body;
//     if (title > 50 ) {
//         return response.status(400).json({
//             mensagem: "Título não pode ultrapassar 50 caracteres."
//         })
//     }
// } 
// export default async function UserUidNonexistent(request: Request, response: Response, next: NextFunction) {
//     const { userUID } = request.params;
//     const existentUid = await User.findOne({ uid: userUID });
//     if (!existentUid) {
//         return response.status(404).json({
//             mensagem: "Este usuário não existe."
//         });
//     }
//     next();
// } 
