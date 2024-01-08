<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import CloseButton from '$lib/components/CloseButton.svelte';

  let latestUpdate = $page.data.latestUpdate;
  let banner = {
    display: false,
    message: latestUpdate?.description,
  };

  $: latestUpdate = $page.data.latestUpdate;

  onMount(() => {
    banner.display = localStorage.getItem('lastBannerRemove')
      ? new Date(localStorage.getItem('lastBannerRemove')) <
        new Date(latestUpdate?.date)
        ? new Date(latestUpdate?.date) < new Date()
        : false
      : true;
  });

  const removeBanner = () => {
    banner.display = false;
    localStorage.setItem('lastBannerRemove', new Date());
  };
</script>

<div class="transition-all {banner.display ? 'h-10' : 'h-0'}"></div>

<div
  class="fixed top-[5.25rem] rounded-full shadow-md max-w-screen-2xl w-[calc(100%-1rem)] left-1/2 flex flex-row items-center justify-center -translate-x-1/2 bg-primary-500 dark:bg-primary-700 z-40 px-4 py-1 md:py-2 transition-all {banner.display
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <p class="text-neutral-100">{banner.message}</p>
  <CloseButton
    on:click={removeBanner}
    class="absolute top-1/2 -translate-y-1/2 right-2"
  />
</div>
