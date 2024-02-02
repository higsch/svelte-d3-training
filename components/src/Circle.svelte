<script>
  export let x;
  export let y;
  export let r;
  export let fill;
</script>

<circle
	cx={x}
	cy={y}
	r={r}
	fill={fill}
/>

<style>
  circle {
    transition: 1s;
    opacity: 0.8;
  }
</style>