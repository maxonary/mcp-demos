import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta(args: Route.MetaArgs) {
	return [
		{ title: "10 Tailwind Tricks from shadcn/ui" },
		{
			name: "description",
			content: "Learn 10 powerful Tailwind CSS tricks from shadcn/ui",
		},
	];
}

export default function Home() {
	const tutorials = [
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

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">
				10 Tailwind Tricks from shadcn/ui
			</h1>
			<div className="space-y-4">
				{tutorials.map((tutorial) => (
					<Link
						key={tutorial.id}
						to={`/${tutorial.slug}`}
						className="block p-4 rounded-lg border hover:bg-slate-100 transition-colors"
					>
						<span className="font-semibold">{tutorial.id}.</span>{" "}
						{tutorial.title}
					</Link>
				))}
			</div>
		</div>
	);
}
