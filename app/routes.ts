import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [layout(
    'layout/layout.tsx', [index("routes/dashboard.tsx"),
        route("tasks", 'routes/tasks.tsx'),
        route("tasks/new", 'routes/task-new.tsx'),
        route("tasks/edit/:id", 'routes/task-edit.tsx')
    ]
)] satisfies RouteConfig;
