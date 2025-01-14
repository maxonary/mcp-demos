export interface paths {
    "/todos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Todos
         * @description Fetch the list of todo items.
         *
         *     Returns:
         *         list[TodoItem]: A list of TodoItem objects.
         */
        get: operations["get_todos_todos_get"];
        put?: never;
        /**
         * Create Todo
         * @description Asynchronously creates a new todo item and adds it to the list of todos.
         *
         *     Args:
         *         todo (TodoItem): The todo item to be added.
         *
         *     Returns:
         *         TodoItem: The todo item that was added.
         */
        post: operations["create_todo_todos_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * CreateTodoDto
         * @description Data Transfer Object (DTO) for creating a new Todo item.
         */
        CreateTodoDto: {
            /** Title */
            title: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /**
         * TodoDto
         * @description Represent a to-do item.
         */
        TodoDto: {
            /** Id */
            id: number;
            /** Title */
            title: string;
            /** Completed */
            completed: boolean;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    get_todos_todos_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoDto"][];
                };
            };
        };
    };
    create_todo_todos_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTodoDto"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoDto"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
