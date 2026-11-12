// Edit names, handles, and verified status in this list.
const creators = [
	{ name: "Suryansh Nimmagadda", handle: "Programmerare", points: 30000, trend: 1, verified: true },
	{ name: "Jonathan", handle: "Hjälp För Tillåtelse", points: 15000, trend: 2, verified: true },
	{ name: "Albin Barbim", handle: "Support", points: 15000, trend: 3, verified: true }

];

const creatorList = document.querySelector("#creator-list");
const avatarColors = ["one", "two", "three", "four", "five"];
const pointsFormatter = new Intl.NumberFormat("sv-SE");

function makeCell(className, text, role = "cell") {
	const element = document.createElement("span");
	element.className = className;
	element.setAttribute("role", role);
	element.textContent = text;
	return element;
}

creators.forEach((creator, index) => {
	const row = document.createElement("div");
	row.className = `creator-row${index === 0 ? " featured" : ""}`;
	row.setAttribute("role", "row");

	const rank = makeCell(`rank${index === 0 ? " rank-first" : ""}`, String(index + 1).padStart(2, "0"));
	const creatorInfo = document.createElement("div");
	creatorInfo.className = "creator-info";
	creatorInfo.setAttribute("role", "cell");

	const avatar = document.createElement("span");
	avatar.className = `avatar avatar-${avatarColors[index % avatarColors.length]}`;
	avatar.textContent = creator.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();

	const name = document.createElement("span");
	name.className = "creator-name";
	name.append(document.createTextNode(creator.name));
	if (creator.verified) {
		const badge = document.createElement("img");
		badge.className = "verified";
		badge.src = "Glowing Blue Verified Badge.png";
		badge.alt = "Verifierad skapare";
		name.append(badge);
	}

	const handle = document.createElement("span");
	handle.className = "creator-handle";
	handle.textContent = creator.handle;
	creatorInfo.append(avatar, name, handle);

	const points = makeCell("points", "");
	points.append(document.createTextNode(pointsFormatter.format(creator.points)));
	const pointsLabel = document.createElement("small");
	pointsLabel.textContent = " poäng";
	points.append(pointsLabel);

	const trendValue = creator.trend;
	const trend = makeCell(`trend${trendValue === 0 ? " steady" : ""}`, "");
	const trendIcon = document.createElement("span");
	trendIcon.setAttribute("aria-hidden", "true");
	trendIcon.textContent = trendValue > 0 ? "↑" : trendValue < 0 ? "↓" : "−";
	trend.append(trendIcon, document.createTextNode(` ${Math.abs(trendValue)}`));

	row.append(rank, creatorInfo, points, trend);
	creatorList.append(row);
});