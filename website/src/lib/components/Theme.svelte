<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores';
  import Icon from '@iconify/svelte';

  onMount(() => {
    setTheme();
  });

  function setTheme() {
    if (typeof document === undefined) return;
    if ($theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
</script>

<div class="right-2 bottom-4 fixed z-40">
  <button
    name="themeToggle"
    class="group w-8 h-8 rounded-full shadow cursor-pointer bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
    on:click|preventDefault={() => {
      $theme = $theme === 'light' ? 'dark' : 'light';
      setTheme();
    }}
  >
    {#if $theme === 'light'}
      <Icon
        icon="heroicons:sun"
        class="w-6 h-6 group-hover:fill-yellow-300 dark:opacity-0 opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:rotate-45"
      />
    {:else}
      <Icon
        icon="heroicons:moon"
        class="w-6 h-6 group-hover:fill-gray-700 opacity-0 dark:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
      />
    {/if}
  </button>
</div>
