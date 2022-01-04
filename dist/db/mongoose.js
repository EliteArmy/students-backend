"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(process.env.MONGODB_URL, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .catch(error => {
    // tslint:disable-next-line:no-console
    console.log(error);
});
//# sourceMappingURL=mongoose.js.map