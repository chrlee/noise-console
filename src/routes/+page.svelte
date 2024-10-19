<script lang="ts">
  const modules = import.meta.glob('/src/routes/**/+page.svelte');
  const menuItems = Object.keys(modules).map((item) => item.match(/\/src\/routes\/(.*?)\/\+page\.svelte/)[1]);
</script>

<div>
  <h1>Noise Console</h1>

  <p>Mathematical noise visualizations in order of increasing input & output dimension</p>

  <ul>
    {#each menuItems as item}
      <li><a href="/{item}">{item}</a></li>
    {/each}
  </ul>
</div>

<style>
  div {
    margin: 1rem;
  }
  
  h1 {
    margin: 0;
  }
</style>
