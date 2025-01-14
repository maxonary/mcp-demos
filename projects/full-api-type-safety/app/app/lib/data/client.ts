import createClient from "openapi-fetch";
import type { paths } from "./openapi.ts";

export const apiBaseUrl = "http://localhost:8000";


export const client = createClient<paths>({
	baseUrl: apiBaseUrl,
	credentials: "include",
});

export async function getTodosQuery() {
	const { data, error } = await client.GET("/todos");
	if (error) {
		throw new Error("Failed to fetch todos");
	}
	return data;
}

export async function createTodoMutation(title: string) {
	const { data, error } = await client.POST("/todos", {
		body: { title },
	});

	if (error) {
		throw new Error("Failed to create todo");
	}

	return data;
}
