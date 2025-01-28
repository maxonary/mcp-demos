import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
const navigationData = [
	{
		id: "01",
		slug: "01-dynamic-width-css-custom-properties",
		title: "Dynamic Width CSS Custom Properties",
	},
	{
		id: "02",
		slug: "02-toggle-styles-data-attributes",
		title: "Toggle Styles with Data Attributes",
	},
	{
		id: "03",
		slug: "03-nested-svg-parent-data-states",
		title: "Nested SVG Parent Data States",
	},
	{
		id: "04",
		slug: "04-parent-child-style-inheritance",
		title: "Parent Child Style Inheritance",
	},
	{
		id: "05",
		slug: "05-group-based-state-management",
		title: "Group Based State Management",
	},
	{
		id: "06",
		slug: "06-data-slots-hover-interactions",
		title: "Data Slots Hover Interactions",
	},
	{
		id: "07",
		slug: "07-peer-element-state-control",
		title: "Peer Element State Control",
	},
	{
		id: "08",
		slug: "08-named-group-focus-states",
		title: "Named Group Focus States",
	},
	{
		id: "09",
		slug: "09-cross-component-state-sharing",
		title: "Cross Component State Sharing",
	},
	{
		id: "10",
		slug: "10-variant-based-prop-styling",
		title: "Variant Based Prop Styling",
	},
];

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..700&display=swap",
	},
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="font-sans">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<header className="fixed top-0 left-0 w-full h-[60px] border-b-2 border-black flex items-center p-8 bg-background">
				<div className="font-bold">10 Tailwind Tricks from Shadcn</div>
				<nav className="flex gap-2 ml-8">
					<Link to="/" className="p-4">
						Home
					</Link>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Examples</NavigationMenuTrigger>
								<NavigationMenuContent className="w-max">
									{/* <NavigationMenuLink>Link</NavigationMenuLink> */}

									{navigationData.map((item) => (
										<Link key={item.id} to={`/${item.slug}`} className="">
											<NavigationMenuLink
												key={item.id}
												asChild
												className={navigationMenuTriggerStyle()}
											>
												<Link to={`/${item.slug}`} className="">
													<span className="font-semibold">{item.id}.</span>{" "}
													{item.title}
												</Link>
											</NavigationMenuLink>
										</Link>
									))}
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</nav>
			</header>
			<main className="flex flex-col gap-8 max-w-[700px] justify-center items-center mx-auto p-4 mt-16 pb-64">
				<Outlet />
			</main>
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
