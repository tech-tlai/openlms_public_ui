// write load function to fetch data from api and store it in a variable

export async function load({ fetch, parent }) {
	const parentData = await parent();
	const lang = parentData?.lang || 'en';

	// Fetch FAQs based on language
	const fetchFaq = async () => {
		try {
			const res = await fetch(`/apis/faq`);
			if (!res.ok) {
				throw new Error('Failed to fetch faq');
			}
		

			const data = await res.json();
			if (!data || data.length === 0) {
				throw new Error('No Data Found');
			}

			return data
		
		} catch (err) {
			return { error: err.message, status: err.status  };
		}
	};

	const fetchFaqCategoryList = async (lang) => {
		try {
			const res = await fetch(`/apis/faq/category`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await res.json();
			if (!data || data.length === 0) {
				throw new Error('No Data Found');
			}
			return data ;
		} catch (err) {
			return { error: err.message, status: err.status  };
		}
	};

	return {
		FAQData: await fetchFaq(),
		faqCategory: await fetchFaqCategoryList()
	};
}