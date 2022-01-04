"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
app_1.default.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on port: ${port}`);
});
//# sourceMappingURL=index.js.map