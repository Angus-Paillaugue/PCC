<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
  import Button from './Button.svelte';

    let user = $page.data.user;
    let extensions = $page.data.extensions;
    let getBrowserType = $page.data.getBrowserType;
    let extension = extensions[0];
    let navbar = false;

    onMount(() => {
        if(extensions.filter(el => el.plateforme === getBrowserType()).length > 0){
            extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        }else {
            extension = "blank";
        }
    })
</script>

<nav class="px-4 py-2 border-b bg-neutral-100/50 dark:bg-neutral-900/80 backdrop-blur-lg z-40 border-neutral-200 dark:border-neutral-700 fixed top-0 left-0 w-full h-16">
    <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full">
        <a href="/" class="h-full" name="home"><img src="/logos/128-icon.png" alt="" class="h-full"></a>

        <ul class="md:flex flex-row gap-4 hidden">
            <li>
                <a href="/" class="nav-link w-fit">Home</a>
            </li>
            <li>
                <a href="/help" class="nav-link w-fit">Get help</a>
            </li>
            <li>
                <a href="/pricing" class="nav-link w-fit">Pricing</a>
            </li>
        </ul>
        <div class="max-md:hidden">
            {#if !user}
                <Button buttonType="link" href="/auth" size="small" color="secondary">Log-in</Button>
            {:else}
                <Button buttonType="link" href="/dashboard" size="small" color="secondary">Dashboard</Button>
            {/if}
            {#if extension !== "blank"}
                <Button buttonType="link" href={extension.link} size="small" color="primary" class="ml-2">Download</Button>
            {/if}
        </div>
        <button on:click={() => {navbar = !navbar}} class="md:hidden">
            {#if navbar}
                <Icon icon="heroicons:x-mark-solid" class="w-6 h-6" />
            {:else}
                <Icon icon="heroicons:bars-3-solid" class="w-6 h-6" />
            {/if}
        </button>
    </div>
</nav>

<div class="fixed top-16 h-full w-full left-0 p-4 pb-20 flex md:hidden flex-col gap-2 justify-center items-center bg-gray-200/50 dark:bg-neutral-900/80 backdrop-blur transition-opacity {navbar ? "opacity-100 z-30" : "opacity-0 -z-10"}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <ul class="flex flex-col gap-4 text-center" on:click={() => {navbar = false;}}>
        <li>
            <a href="/" class="nav-link w-fit">Home</a>
        </li>
        <li>
            <a href="/help" class="nav-link w-fit">Get help</a>
        </li>
        <li>
            <a href="/pricing" class="nav-link w-fit">Pricing</a>
        </li>
        <li>
            {#if !user}
                <Button buttonType="link" href="/auth" size="small" color="secondary">Log-in</Button>
            {:else}
                <Button buttonType="link" href="/dashboard" size="small" color="secondary">Dashboard</Button>
            {/if}
        </li>
        {#if extension !== "blank"}
            <li>
                <Button buttonType="link" href={extension.link} size="small" color="primary">Download</Button>
            </li>
        {/if}
    </ul>
</div>