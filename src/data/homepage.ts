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

export async function getHomepageData(site?: URL) {
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
			isoDate: event.data.date.toISOString().slice(0, 10),
			date: new Date(event.data.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				timeZone: "UTC",
			}),
			// Set like a flyer's date: a small month over a big day numeral.
			month: new Date(event.data.date).toLocaleDateString("en-US", {
				month: "short",
				timeZone: "UTC",
			}),
			day: String(event.data.date.getUTCDate()),
			flyer: event.data.flyer,
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
						label: event.data.sourceLabel || "BREAD records",
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
		{ label: "Events with sources", value: sourceLinkedEvents },
		{ label: "Residents", value: roster.length },
	];

	// A strip of flyers across the whole run, one per era.
	const featuredVisuals = [
		{
			src: "/drive/bread-x-grime-city_150213-show.png",
			alt: "BREAD x Grime City flyer featuring Nevermind and Helix",
			title: "BREAD x Grime City",
			caption: "The pilot night at F8, February 2015",
			href: "/archive/flyers/",
		},
		{
			src: "/drive/bread2-smaller.jpg",
			alt: "BREAD #2 flyer with chain and blue artwork treatment",
			title: "BREAD #2",
			caption: "Rabit, Sheen, Korma, Lyeform · July 2015",
			href: "/archive/flyers/",
		},
		{
			src: "/drive/bread-3-flyer-final-letter.png",
			alt: "BREAD no.3 flyer with yellow and blue dots, lineup in bold capitals",
			title: "BREAD #3",
			caption: "Doctor Jeep, Patrick Brian · November 2015",
			href: "/archive/flyers/",
		},
		{
			src: "/bread-5-jlin-planet-mu-iyer-2016-03-25-flyer.jpg",
			alt: "BREAD #5 flyer: JLIN, Planet Mu, Iyer over a swirling purple pattern",
			title: "BREAD #5",
			caption: "Jlin, Iyer · March 2016",
			href: "/archive/flyers/",
		},
		{
			src: "/drive/posters/bread-9-v3_poster.jpg",
			alt: "BREAD 9 poster with the lineup in blackletter on grey concrete",
			title: "BREAD #9",
			caption: "Deadboy, Murlo, Blackdown · July 2016",
			href: "/archive/flyers/",
		},
		{
			src: "/bread-long-bread-summer-fundraiser-2021-07-10.jpg",
			alt: "Long Bread Summer flyer: a baguette floating over sky-blue water",
			title: "Long Bread Summer",
			caption: "Fundraiser stream · July 2021",
			href: "/archive/flyers/",
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
				site,
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
			site,
			name: "BREAD",
			image: "/og/home.png",
			description:
				"BREAD: a San Francisco club night, fundraiser stream, and radio show, 2015–2024.",
		}),
		createCollectionPageSchema({
			site,
			pathname: "/",
			name: "BREAD",
			description: "Events, residents, flyers, and mixes from BREAD.",
			isPartOf: "BREAD",
		}),
		createItemListSchema({
			name: "BREAD Events",
			description: "BREAD events from 2015 to 2024.",
			itemListElement: eventSchemas,
		}),
	].filter((entry): entry is Record<string, unknown> => Boolean(entry));

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

	const platformEmbedsMap = Object.fromEntries(
		platformEmbeds.map((item) => [item.key, item]),
	) as Record<string, (typeof platformEmbeds)[number]>;

	return {
		documentedChronology,
		roster,
		summaryStats,
		featuredVisuals,
		directoryLinks,
		soundcloudEmbedCollections,
		platformEmbeds: platformEmbedsMap,
		residentSoundcloudProfiles,
		homeStructuredData,
		buildSoundCloudEmbedSrc,
	};
}
