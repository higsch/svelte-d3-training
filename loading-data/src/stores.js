// @ts-nocheck
import { readable, derived } from 'svelte/store';
import { csv, autoType, groups } from 'd3';

const dataPath = 'https://raw.githubusercontent.com/higsch/data/main/daily_surface_temperature.csv';

export const data = readable([], async (set) => {
  const loadedData = await csv(dataPath, autoType);
  set(loadedData);
});

export const dataByYear = derived(data, $data => {
  return groups($data, d => d.year).map(([key, values]) => {
    return {
      key,
      values
    };
  });
});