import { createRouter } from "./context";
import superjson from "superjson";

import { companyRouter } from "./company";
import { employeeRouter } from "./employee";
import { taskRouter } from "./task";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("company.", companyRouter)
  .merge("employee.", employeeRouter)
  .merge("task.", taskRouter);

export type AppRouter = typeof appRouter;
