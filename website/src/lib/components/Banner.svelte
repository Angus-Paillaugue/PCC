<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';

    let latestUpdate;
    let banner;

    $: latestUpdate = $page.data.latestUpdate;
    $: banner = {
        display : false,
        message : latestUpdate?.description
    };

    onMount(() => {
        banner.display = new Date(localStorage.getItem("lastBannerRemove")) < new Date(latestUpdate?.date) ? new Date(latestUpdate?.date) < new Date() : false;
    });

    const removeBanner = () => {
        banner.display = false;
        localStorage.setItem("lastBannerRemove", new Date());
    }
</script>

{#if banner?.display}
    <div class="fixed top-16 left-0 bg-primary-600 dark:bg-primary-700 w-full h-12 z-40">
        <div class="max-w-screen-lg w-full mx-auto flex flex-row items-center justify-center h-full relative">
            <p class="text-neutral-100">{banner.message}</p>
            <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md hover:bg-primary-300 dark:hover:bg-primary-500 text-neutral-900 group aspect-square flex flex-col items-center justify-center" name="close" on:click={removeBanner}>
                <Icon icon="heroicons:x-mark-solid" class="w-6 h-6 transition-all group-hover:rotate-90" />
            </button>
        </div>
    </div>
{/if}