<script lang="ts">
  const modules = import.meta.glob('/src/routes/**/+page.svelte');
  const menuItems = Object.keys(modules).map((item) => item.match(/\/src\/routes\/(.*?)\/\+page\.svelte/)[1]);
</script>

<ul>
  {#each menuItems as item}
    <li><a href="/{item}">{item}</a></li>
  {/each}
</ul>
