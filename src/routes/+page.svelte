<script>
	import LandingPageCourses from '$lib/landingPageCourses/LandingPageCourses.svelte';
	import MessageCarousel from '$lib/ministersMessage/messageCarousel.svelte';
	import HeroSection from '$lib/landingPage/HeroSection.svelte';
	import CollaborationsSection from '$lib/landingPage/CollaborationsSection.svelte';
	import AboutSection from '$lib/landingPage/AboutSection.svelte';
	import LifeCycleSection from '$lib/landingPage/LifeCycleSection.svelte';
	import TestimonialSection from '$lib/landingPage/TestimonialSection.svelte';
	import HowToUsePlatform from '$lib/landingPage/HowToUsePlatform.svelte';
	import NewHeroSection from '$lib/landingPage/NewHeroSection.svelte';
	export let data;

	const { allCoursesData, testimonialData, overAllStatsData, lang, carouselData } = data;
</script>

<NewHeroSection />
<CollaborationsSection endorsedBy="Empowering Top Brands" />
<AboutSection generalStats={overAllStatsData} token={data.token} />
<LandingPageCourses cardsData={allCoursesData} />
<HowToUsePlatform />
<TestimonialSection testimonials={testimonialData} {lang} />
