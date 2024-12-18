export async function load({ fetch, params, parent }) {
	const parentData = await parent();
	const lang = parentData?.lang ? parentData.lang : 'en';

	const id = params.id;
	const fetchTestimonials = async () => {
		try {
			const res = await fetch(`/apis/testimonials?courseUuid=${id}`);
			if (res.status == 404) {
				return [];
			}

			const data = await res.json();
			if (!data || data.length === 0) {
				return [];
			}
			let testimonialData = [];
			testimonialData = data
				.filter((item) => {
					if (item != null) return true;
				})
				.map((item) => {
					const langData = item.translations.find(
						(translation) => translation.languageCode === lang
					);
					const enData = item.translations.find((translation) => translation.languageCode === 'en');

					let requiredLangData = langData ? langData : enData;
					if (requiredLangData) {
						return {
							courseUuid: item.courseUuid,
							uuid: item.uuid,
							name: requiredLangData.name,
							designation: requiredLangData.designation,
							testimonialText: requiredLangData.testimonialText,
							place: requiredLangData.place
						};
					}
				});
			return testimonialData;
		} catch (err) {
			return [];
		}
	};

	return {
		testimonials: await fetchTestimonials()
	};
}
