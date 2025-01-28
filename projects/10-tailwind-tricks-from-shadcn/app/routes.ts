import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route(
		"01-dynamic-width-css-custom-properties",
		"routes/01-dynamic-width-css-custom-properties.tsx",
	),
	route(
		"02-toggle-styles-data-attributes",
		"routes/02-toggle-styles-data-attributes.tsx",
	),
	route(
		"03-nested-svg-parent-data-states",
		"routes/03-nested-svg-parent-data-states.tsx",
	),
	route(
		"04-parent-child-style-inheritance",
		"routes/04-parent-child-style-inheritance.tsx",
	),
	route(
		"05-group-based-state-management",
		"routes/05-group-based-state-management.tsx",
	),
	route(
		"06-data-slots-hover-interactions",
		"routes/06-data-slots-hover-interactions.tsx",
	),
	route(
		"07-peer-element-state-control",
		"routes/07-peer-element-state-control.tsx",
	),
	route(
		"08-named-group-focus-states",
		"routes/08-named-group-focus-states.tsx",
	),
	route(
		"09-cross-component-state-sharing",
		"routes/09-cross-component-state-sharing.tsx",
	),
	route(
		"10-variant-based-prop-styling",
		"routes/10-variant-based-prop-styling.tsx",
	),
] satisfies RouteConfig;
