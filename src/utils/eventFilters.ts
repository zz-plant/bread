export const EVENTS_PER_PAGE = 50;

export interface EventItem {
	index: number;
	year: string;
	venue: string;
	lineup: string;
	title: string;
	status: string;
	hasSource: boolean;
}

export function createYearVenueChips(
	container: HTMLElement,
	items: string[],
	filterType: string,
): void {
	const allChip = document.createElement("button");
	allChip.className = "chip active";
	allChip.textContent = "All";
	allChip.setAttribute("data-filter", "all");
	allChip.setAttribute("data-type", filterType);
	container.appendChild(allChip);

	items.forEach((item) => {
		const chip = document.createElement("button");
		chip.className = "chip";
		chip.textContent = item;
		chip.setAttribute("data-filter", item);
		chip.setAttribute("data-type", filterType);
		container.appendChild(chip);
	});
}

export interface ActiveFilters {
	year: string;
	venue: string;
	search: string;
	quick: string;
	sort: string;
}

export function filterEvents(
	eventCards: HTMLElement[],
	activeFilters: ActiveFilters,
): HTMLElement[] {
	const searchTerm = activeFilters.search.toLowerCase();
	const visibleEvents: HTMLElement[] = [];

	eventCards.forEach((card) => {
		const year = card.getAttribute("data-year");
		const venue = card.getAttribute("data-venue");
		const lineup = card.getAttribute("data-lineup")?.toLowerCase() || "";
		const title =
			card.querySelector(".title")?.textContent?.toLowerCase() || "";

		const matchesSearch =
			!searchTerm ||
			title.includes(searchTerm) ||
			venue?.toLowerCase().includes(searchTerm) ||
			lineup.includes(searchTerm);

		const matchesYear =
			activeFilters.year === "all" || year === activeFilters.year;
		const matchesVenue =
			activeFilters.venue === "all" || venue === activeFilters.venue;
		const matchesQuick =
			activeFilters.quick === "all" ||
			(activeFilters.quick === "linked" &&
				card.getAttribute("data-has-source") === "true") ||
			(activeFilters.quick === "changed" &&
				card.getAttribute("data-status") !== "played");

		const isVisible =
			matchesSearch && matchesYear && matchesVenue && matchesQuick;
		card.style.display = "none";
		if (isVisible) visibleEvents.push(card);
	});

	return visibleEvents;
}

export function sortVisibleEvents(
	visibleEvents: HTMLElement[],
	sortType: string,
): void {
	visibleEvents.sort((a, b) => {
		const ai = Number(a.getAttribute("data-index") || 0);
		const bi = Number(b.getAttribute("data-index") || 0);
		return sortType === "newest" ? bi - ai : ai - bi;
	});
}

export function showEventsPage(
	visibleEvents: HTMLElement[],
	page: number,
	resultCount: HTMLElement | null,
	loadMoreBtn: HTMLElement | null,
): number {
	const start = 0;
	const end = page * EVENTS_PER_PAGE;

	visibleEvents.forEach((card, index) => {
		card.style.display = index >= start && index < end ? "" : "none";
	});

	const total = visibleEvents.length;
	const remaining = total - end;

	if (resultCount) {
		resultCount.textContent =
			remaining > 0
				? `Showing ${end} of ${total}`
				: `${total} ${total === 1 ? "event" : "events"}`;
	}

	if (loadMoreBtn) {
		loadMoreBtn.style.display = remaining > 0 ? "" : "none";
		loadMoreBtn.textContent = `Show ${Math.min(remaining, EVENTS_PER_PAGE)} more`;
	}

	return page;
}
