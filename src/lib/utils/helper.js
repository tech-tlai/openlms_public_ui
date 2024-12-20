export function formatDurationHHMM(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	if (hours > 0) {
		if (mins === 0) return `${hours}hr`;
		return `${hours}hr ${mins}mins`;
	}
	if (mins > 1) {
		if (remainingSeconds === 0) return `${mins} mins`;
		return `${mins}mins ${remainingSeconds}s`;
	} else {
		return `0 mins`;
	}
}

export function formatDate_YYYY_MM_DD_to_DD_MM_YYYY(date) {
	if (typeof date !== 'string') {
		return date;
	}

	const dateArray = date.split('-');
	const formatedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

	return formatedDate;
}

export function formatNumberWithCommas(number) {
	// Create a NumberFormat object for the Indian locale

	// number = String(number)
	const formatter = new Intl.NumberFormat('en-IN');

	// Format the number
	return formatter.format(number);
}

export function setLocalStoreData(key, value) {
	// typeof window !== 'undefined': This checks whether the window object is available, ensuring that the code is running in a browser environment.

	// window.localStorage: This verifies that the localStorage API is available on the window object.

	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(key, JSON.stringify(value));
	} else {
		console.warn('Local storage is not available in this environment to set data');
	}
}

export function getLocalStoreData(key) {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedData = window.localStorage.getItem(key);

		return storedData ? JSON.parse(storedData) : null;
	} else {
		console.warn('Local storage is not available in this environment to get data');
	}
}

export function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	if (typeof window !== 'undefined') {
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}
}

export function getCookie(cname) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);

	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export function isObject(obj) {
	return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export const formatDateMMMYYYY = (date) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const d = new Date(date);
	return `${monthNames[d.getMonth()]}-${d.getFullYear()}`;
};

export function extractYouTubeVideoId(url) {
	// Regular expression to match YouTube video URLs in various formats
	const youtubeRegex =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([^#&?]*).*/;
	const match = url?.match(youtubeRegex);

	if (match && match[1]) {
		return match[1];
	} else {
		return null; // Or handle the error case as needed
	}
}
