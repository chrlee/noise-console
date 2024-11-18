<script lang="ts">
  import { goto, afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { base } from '$app/paths'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'

  injectAnalytics();

  let currentPage : string = $page.url.pathname;
  let previousPage : string = base;

  afterNavigate(({from}) => {
     previousPage = from?.url.pathname || previousPage;
     currentPage = $page.url.pathname;
  }) 

</script>

<div class="container">
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
    font-family: -apple-system, -apple-system,  
                BlinkMacSystemFont, 'Segoe UI', Roboto,  
                Oxygen, Ubuntu, Cantarell, 'Open Sans',  
                'Helvetica Neue', sans-serif; 
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: none;
  }

  .container > :global(h1), :global(h2), :global(h3),
    :global(p), :global(a) {
    margin: 1rem;
  }

  :global(a) {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }

</style>
