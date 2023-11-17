<script lang="ts">
  import { goto, afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { base } from '$app/paths'

  let currentPage : string = $page.url.pathname;
  let previousPage : string = base;

  afterNavigate(({from}) => {
     previousPage = from?.url.pathname || previousPage;
     currentPage = $page.url.pathname;
  }) 

</script>

<div>
  {#if currentPage !== '/'}
    <a on:click={() => goto(previousPage || $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')) || '/')}>back</a>
  {/if}
  <slot />
</div>

<style>
  @import '../reset.css';

  :global(:root) {
    color-scheme: dark;
  }
  
  :global(html, body) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #121212;
  }

  div{
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    flex-direction: column;
    justify-content: center;
  }
</style>
