"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.User = void 0;
const auth_entity_1 = require("../entities/auth.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return auth_entity_1.User; } });
const event_entity_1 = require("../entities/event.entity");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return event_entity_1.Event; } });
const entities = [auth_entity_1.User, event_entity_1.Event];
exports.default = entities;
//# sourceMappingURL=index.js.map