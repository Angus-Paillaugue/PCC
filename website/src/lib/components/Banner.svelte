<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import CloseButton from "$lib/components/CloseButton.svelte";

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
            <CloseButton  on:click={removeBanner} class="absolute top-1 right-1" />
        </div>
    </div>
{/if}