<script>
  import { scaleLinear, Delaunay } from 'd3';

  const data = Array.from({length: 100}).map(() => {
    return {
      a: Math.random(),
      b: Math.random()
    };
  });

  let width, height;
  let voronoi;

  function handleMouseMove(event) {
    const { layerX, layerY } = event;
    renderedData = [
      {
        x: layerX,
        y: layerY
      },
      ...renderedData.slice(1)
    ];
  }

  $: xScale = scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  $: yScale = scaleLinear()
    .domain([0, 1])
    .range([0, height]);

  $: renderedData = data.map(d => {
    return {
      x: xScale(d.a),
      y: yScale(d.b)
    };
  });

  $: if (width && height) {
    const delaunay = Delaunay.from(renderedData, d => d.x, d => d.y);
    voronoi = delaunay.voronoi([0, 0, width, height]);
  }
</script>

<main
  bind:clientWidth={width}
  bind:clientHeight={height}
  on:mousemove={handleMouseMove}
>
  <svg
    width={width}
    height={height}
  >
    {#if voronoi}
      {#each renderedData as d, i}
        <path
          d={voronoi.renderCell(i)}
          fill={i === 0 ? 'pink' : 'none'}
          stroke="steelblue"
          stroke-width="3"
        />
        <circle
          cx={d.x}
          cy={d.y}
          r={i === 0 ? 7 : 3}
          fill="purple"
          stroke="none"
        />
      {/each}
    {/if}
  </svg>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
