<!-- routes/flow/+page.svelte -->
<script lang="ts">
  import FlowField from '$lib/FlowField.svelte';
</script>

<FlowField />

<style>
  /* Add any route-specific styles here */
  :global(body) {
    overflow: hidden; /* Prevent scrollbars */
  }
</style>