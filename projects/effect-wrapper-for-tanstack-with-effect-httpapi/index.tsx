// 1. Define the API contract
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "@effect/platform";
import { Schema } from "effect";

const LoginSignup = Schema.Struct({
	email: Schema.String,
	password: Schema.String,
});
const User = Schema.Struct({
	id: Schema.Number,
	email: Schema.String,
});
const Todo = Schema.Struct({
	id: Schema.Number,
	name: Schema.String,
});
const CreateTodo = Schema.Struct({
	name: Schema.String,
});

// Define the API contract
const Api = HttpApi.make("Api")
	.add(
		HttpApiGroup.make("auth")
			.add(HttpApiEndpoint.get("me", "/me").addSuccess(User))
			.add(HttpApiEndpoint.post("signup", "/signup").setPayload(LoginSignup))
			.add(HttpApiEndpoint.post("login", "/login").setPayload(LoginSignup))
			.add(HttpApiEndpoint.post("logout", "/logout"))
			.prefix("/auth"),
	)
	.add(
		HttpApiGroup.make("todos")
			.add(HttpApiEndpoint.get("getTodos", "/").addSuccess(Schema.Array(Todo)))
			.add(HttpApiEndpoint.post("createTodo", "/").setPayload(CreateTodo))
			.add(
				HttpApiEndpoint.del("deleteTodo", "/:id").setPath(
					Schema.Struct({
						id: Schema.NumberFromString,
					}),
				),
			)
			.prefix("/todos"),
	);

// 2. Create useEffectQuery, useEffectMutation and getQueryKey helpers

import { HttpApiClient, type HttpClientResponse } from "@effect/platform";
import {
	type UseMutationOptions,
	type UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { Effect } from "effect";

// Build the ApiClient Service

class ApiClient extends Effect.Service<ApiClient>()("ApiClient", {
	effect: Effect.gen(function* () {
		return {
			client: yield* HttpApiClient.make(Api, {
				baseUrl: "http://localhost:3000",
			}),
		};
	}),
}) {}

type Client = ApiClient["client"];

const queryExample = Effect.gen(function* () {
	const { client } = yield* ApiClient;
	const res = yield* client.auth.login({
		payload: {
			email: "test@test.com",
			password: "test",
		},
	});
});

// Create the type helpers to extract endpoints parameters and return types

type GetRequestParams<
	X extends keyof Client,
	Y extends keyof Client[X],
> = Client[X][Y] extends (...args: any[]) => any
	? Parameters<Client[X][Y]>[0]
	: never;

type GetReturnType<
	X extends keyof Client,
	Y extends keyof Client[X],
> = Client[X][Y] extends (...args: any[]) => any
	? ReturnType<Client[X][Y]>
	: never;

type LoginParamsType = GetRequestParams<"auth", "login">;
type MeReturnType = GetReturnType<"auth", "me">;

// Create a function that given the group and endpoint returns and Effect that queries the API

function apiEffect<X extends keyof Client, Y extends keyof Client[X]>(
	section: X,
	method: Y,
	params: GetRequestParams<X, Y>,
): GetReturnType<X, Y> {
	const res = Effect.gen(function* () {
		const { client } = yield* ApiClient;
		const sectionObj = client[section];
		const methodFn = sectionObj[method];
		if (typeof methodFn !== "function") {
			throw new Error(
				`Method ${String(section)}.${String(method)} is not a function`,
			);
		}
		return yield* (methodFn as any)(params);
	}) as GetReturnType<X, Y>;
	return res;
}

const meEffect = apiEffect("auth", "me", {});

// Create additional helpers to clean the success type and create a Promise succes type

type ExcludeHttpResponseTuple<T> = Exclude<
	T,
	readonly [any, HttpClientResponse.HttpClientResponse]
>;

type GetCleanSuccessType<
	X extends keyof Client,
	Y extends keyof Client[X],
> = ExcludeHttpResponseTuple<Effect.Effect.Success<GetReturnType<X, Y>>>;

type PromiseSuccess<
	X extends keyof Client,
	Y extends keyof Client[X],
> = Promise<GetCleanSuccessType<X, Y>>;

// Create a function that given the group, method name and params returns a Promise that queries the API

export function apiEffectRunner<
	X extends keyof Client,
	Y extends keyof Client[X],
>(section: X, method: Y, params: GetRequestParams<X, Y>): PromiseSuccess<X, Y> {
	const program = apiEffect(section, method, params);
	return Effect.runPromise(program.pipe(Effect.provide(ApiClient.Default)));
}

// Create the Tanstack helpers

export function useEffectQuery<
	X extends keyof Client,
	Y extends keyof Client[X],
>(
	section: X,
	method: Y,
	params: GetRequestParams<X, Y>,
	useQueryParams?: Omit<
		UseQueryOptions<GetCleanSuccessType<X, Y>, Error>,
		"queryKey" | "queryFn"
	>,
) {
	return useQuery({
		queryKey: [section, method, params],
		queryFn: () => apiEffectRunner(section, method, params),
		...useQueryParams,
	});
}

export function useEffectMutation<
	X extends keyof Client,
	Y extends keyof Client[X],
>(
	section: X,
	method: Y,
	useMutationParams?: Omit<
		UseMutationOptions<
			GetCleanSuccessType<X, Y>,
			Error,
			GetRequestParams<X, Y>
		>,
		"mutationFn"
	>,
) {
	return useMutation({
		mutationFn: (params: GetRequestParams<X, Y>) =>
			apiEffectRunner(section, method, params),
		...useMutationParams,
	});
}

export function getQueryKey<X extends keyof Client, Y extends keyof Client[X]>(
	section: X,
	method: Y,
	params: GetRequestParams<X, Y>,
) {
	return [section, method, params] as const;
}

// Examples

import React from "react";

function TestComnponent() {
	const queryClient = useQueryClient();

	const me = useEffectQuery("auth", "me", {});
	const todos = useEffectQuery("todos", "getTodos", {});

	const todosQueryKey = getQueryKey("todos", "getTodos", {});

	const login = useEffectMutation("auth", "login", {
		onSuccess: (res) => console.log(res),
		onError: (err) => console.log(err),
	});
	const createTodo = useEffectMutation("todos", "createTodo", {
		onSuccess: (res) => {
			console.log(res);
			queryClient.invalidateQueries({ queryKey: todosQueryKey });
		},
		onError: (err) => console.log(err),
	});

	return (
		<div>
			<p>{me.data?.email}</p>
			<div>
				{todos.data?.map((x) => (
					<div key={x.id}>{x.name}</div>
				))}
			</div>
			<button
				type="button"
				onClick={() =>
					login.mutate({ payload: { email: "t@t.com", password: "t" } })
				}
			>
				Login
			</button>
			<button
				type="button"
				onClick={() => createTodo.mutate({ payload: { name: "test" } })}
			>
				Create Todo
			</button>
		</div>
	);
}
