<script>
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';
	import * as am5 from '@amcharts/amcharts5?client';
	import * as am5map from '@amcharts/amcharts5/map?client';
	import { indiaGeoData } from '$lib/dashboard/indiaGeoData.js';
	import am5themes_Animated from '@amcharts/amcharts5/themes/Animated?client';
	import ErrorMessage from '$lib/courses/ErrorMessage.svelte';

	export let stateID = '';
	export let containerId;
	export let data = [];
	export let heatMapStartingColorGradient = 0x86efac;
	export let heatMapEndingColorGradient = 0x166534;

	let polygonSeries;
	let root;
	let dispatch = createEventDispatcher();
	let error = null;

	onMount(async () => {
		try {
			am5?.ready(function () {
				// Create root
				root = am5?.Root.new(containerId);
				// Set themes
				root?.setThemes([am5themes_Animated?.new(root)]);

				// Create chart
				var chart = root?.container?.children?.push(
					am5map?.MapChart?.new(root, {
						panY: 'translateY',
						panX: 'translateX',
						maxPanOut: 0.5,
						//   projection: am5map.geoAlber(),
						layout: root?.horizontalLayout
					})
				);

				// Create polygon series
				polygonSeries = chart?.series.push(
					am5map?.MapPolygonSeries?.new(root, {
						geoJSON: indiaGeoData,
						valueField: 'value',
						calculateAggregates: true
					})
				);

				chart.set('zoomControl', am5map?.ZoomControl?.new(root, {}));

				polygonSeries?.mapPolygons?.template?.setAll({
					tooltipText: '{name}: {value}'
				});

				polygonSeries?.set('heatRules', [
					{
						target: polygonSeries?.mapPolygons?.template,
						dataField: 'value',

						min: am5.color(heatMapStartingColorGradient),
						max: am5.color(heatMapEndingColorGradient),
						key: 'fill'
					}
				]);

				polygonSeries?.mapPolygons?.template?.events?.on('pointerover', function (ev) {
					heatLegend?.showValue(ev.target.dataItem?.get('value'));
				});

				polygonSeries?.mapPolygons?.template?.events?.on('pointerout', function () {
					heatLegend?.hideTooltip();
				});

				polygonSeries?.mapPolygons?.template?.events?.on('click', function (ev) {
					console.log('event item', ev.target.dataItem);
					dispatch('handleStateData', ev?.target?.dataItem?.get('id'));
				});

				polygonSeries?.data?.setAll(data);

				var heatLegend = chart?.children?.push(
					am5?.HeatLegend?.new(root, {
						orientation: 'horizontal',

						startColor: am5.color(heatMapStartingColorGradient),
						endColor: am5.color(heatMapEndingColorGradient),

						startText: 'Lowest',
						endText: 'Highest',
						stepCount: 6
					})
				);

				heatLegend?.startLabel?.setAll({
					fontSize: 12,
					fill: heatLegend?.get('startColor')
				});

				heatLegend.endLabel?.setAll({
					fontSize: 12,
					fill: heatLegend?.get('endColor')
				});

				// change this to template when possible
				polygonSeries?.events?.on('datavalidated', function () {
					heatLegend?.set('startValue', polygonSeries?.getPrivate('valueLow'));
					heatLegend?.set('endValue', polygonSeries?.getPrivate('valueHigh'));
				});
			}); // end am5.ready()
		} catch (err) {
			error = 'No Data found';
			console.log(err);
		}
	});
	onDestroy(() => {
		try {
			root?.dispose();
		} catch {
			error = 'No data found';
		}
	});
	$: showTooltip(stateID);
	function showTooltip() {
		if (stateID) {
			var dataItem = polygonSeries?.getDataItemById(stateID);
			if (dataItem) {
				// Get the associated map polygon
				const polygon = dataItem?.get('mapPolygon');
				if (polygon) {
					polygon?.showTooltip(); // Show the tooltip
				}
			}
		}
	}
</script>

<!-- HTML -->
{#if error === null}
	<div id={containerId} style="width:100%; height:90%; min-height: 500px;"></div>
{:else}
	<ErrorMessage />
{/if}
