import { getCollection } from "astro:content";
import linksConfig from "../content/config/links.json";
import platformEmbeds from "../content/config/platform-embeds.json";
import {
	createCollectionPageSchema,
	createEventSchema,
	createItemListSchema,
	createWebsiteSchema,
} from "../utils/structuredData";
import { ACCENT_COLOR } from "../utils/theme";

export async function getHomepageData() {
	const events = (await getCollection("events")).sort(
		(a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
	);

	const roster = (await getCollection("roster"))
		.sort((a, b) => a.data.order - b.data.order)
		.map((person) => ({
			name: person.data.name,
			role: person.data.role,
			notes: person.data.notes,
			links: person.data.links,
		}));

	const documentedChronology = events
		.filter((event) => event.data.confidence !== "unverified")
		.map((event) => ({
			id: event.id,
			title: event.data.title,
			year: event.data.year,
			date: new Date(event.data.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			venue: event.data.venue,
			lineup: event.data.lineup,
			confidence: event.data.confidence,
			status: event.data.status,
			source: event.data.sourceHref
				? {
						label: event.data.sourceLabel || "Source",
						href: event.data.sourceHref,
						external: event.data.sourceExternal,
					}
				: {
						label: event.data.sourceLabel || "Archive notes (link coming soon)",
					},
		}));

	const activeYears = new Set(documentedChronology.map((event) => event.year))
		.size;
	const sourceLinkedEvents = documentedChronology.filter((event) =>
		Boolean(event.source.href),
	).length;
	const summaryStats = [
		{ label: "Events listed", value: documentedChronology.length },
		{ label: "Years active", value: activeYears },
		{ label: "Events with links", value: sourceLinkedEvents },
		{ label: "Residents", value: roster.length },
	];

	const featuredVisuals = [
		{
			src: "/drive/bread-x-grime-city_150213-show.png",
			alt: "BREAD x Grime City flyer featuring Nevermind and Helix",
			title: "Pilot flyer · February 2015",
			caption: "BREAD x Grime City at F8",
			href: "/archive/flyers/",
		},
		{
			src: "/drive/bread2-smaller.jpg",
			alt: "BREAD #2 flyer with chain and blue artwork treatment",
			title: "BREAD #2 flyer",
			caption: "Rabit, Sheen, Korma, Lyeform",
			href: "/archive/flyers/",
		},
		{
			src: "/drive/2015-07-19-08.54.27.jpg",
			alt: "Street photo of a BREAD #2 poster on a San Francisco utility pole",
			title: "Street placement",
			caption: "Poster in the wild, San Francisco",
			href: "/story/",
		},
		{
			src: "/drive/img_0530.jpg",
			alt: "Party photo showing three attendees at a BREAD event",
			title: "Party photo",
			caption: "From the venue photo archive",
			href: "/story/",
		},
	];

	const directoryLinks = linksConfig
		.filter((item) => item.type === "link")
		.map((item) => ({
			label: item.label,
			href: item.href,
			external: item.external,
		}));

	const soundcloudEmbedCollections = linksConfig
		.filter((item) => item.type === "embed")
		.map((item) => ({
			title: item.title,
			description: item.description,
			href: item.href,
			height: item.height,
			visual: item.visual,
		}));

	const residentSoundcloudProfiles = roster
		.filter(
			(person): person is (typeof roster)[number] & { links: { sc: string } } =>
				Boolean(person.links.sc),
		)
		.map((person) => ({
			name: person.name,
			role: person.role,
			href: person.links.sc,
		}));

	const monthMap: Record<string, number> = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12,
	};

	const toIsoDate = (year: string, shortDate: string): string | undefined => {
		const [monthLabel, dayRaw] = shortDate.split(" ");
		const month = monthMap[monthLabel];
		const day = Number(dayRaw);
		if (!month || Number.isNaN(day)) return undefined;

		return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
	};

	const mapEventStatus = (status: string): string | undefined => {
		if (status.includes("canceled")) return "https://schema.org/EventCancelled";
		if (status === "played") return "https://schema.org/EventCompleted";
		return undefined;
	};

	const eventSchemas = documentedChronology
		.map((event, index) => {
			const startDate = toIsoDate(event.year, event.date);
			if (!startDate) return undefined;

			return createEventSchema({
				site: undefined as any,
				pagePathname: "/",
				position: index + 1,
				name: event.title,
				startDate,
				venueName: event.venue,
				description: event.lineup,
				status: mapEventStatus(event.status),
			});
		})
		.filter((entry): entry is Record<string, unknown> => Boolean(entry));

	const homeStructuredData = [
		createWebsiteSchema({
			site: undefined as any,
			name: "BREAD",
			description: "BREAD history, flyers, and listening links.",
		}),
		createCollectionPageSchema({
			site: undefined as any,
			pathname: "/",
			name: "BREAD Home",
			description:
				"Main page for the timeline, residents, visuals, and listening links.",
			isPartOf: "BREAD",
		}),
		createItemListSchema({
			name: "BREAD Events",
			description: "Event timeline shown on the BREAD homepage.",
			itemListElement: eventSchemas,
		}),
	].filter((entry): entry is Record<string, unknown> => Boolean(entry));

	const homeNavLinks = [
		{ label: "Home", href: "/" },
		{ label: "Archive", href: "/archive/" },
		{ label: "Flyers", href: "/archive/flyers/" },
		{ label: "Radio shows", href: "/archive/radio-shows/" },
		{ label: "Timeline", href: "/archive/timeline/" },
		{ label: "Story", href: "/story/" },
	];

	const buildSoundCloudEmbedSrc = (href: string, visual = false) => {
		const params = new URLSearchParams({
			url: href,
			color: ACCENT_COLOR,
			auto_play: "false",
			hide_related: "false",
			show_comments: "true",
			show_user: "true",
			show_reposts: "true",
			show_teaser: "true",
			visual: visual ? "true" : "false",
		});

		return `https://w.soundcloud.com/player/?${params.toString()}`;
	};

	return {
		documentedChronology,
		roster,
		summaryStats,
		featuredVisuals,
		directoryLinks,
		soundcloudEmbedCollections,
		platformEmbeds,
		residentSoundcloudProfiles,
		homeStructuredData,
		homeNavLinks,
		buildSoundCloudEmbedSrc,
	};
}
