"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const guards_1 = require("./common/guards");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = new core_1.Reflector();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalGuards(new guards_1.AtGuard(reflector));
    app.use(cookieParser());
    app.enableCors();
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map