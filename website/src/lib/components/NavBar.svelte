<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

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

<nav class="px-4 py-2 border-b bg-neutral-100/50 backdrop-blur-lg z-40 border-neutral-200 fixed top-0 left-0 w-full h-16">
    <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full">
        <a href="/" class="h-full" name="home"><img src="/128-icon.png" alt="" class="h-full"></a>

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
                <a href="/auth" class="button-secondary button-small">Log-in</a>
            {:else}
                <a href="/dashboard" class="button-secondary button-small">Dashboard</a>
            {/if}
            {#if extension !== "blank"}
                <a href="{extension.link}" class="button-primary button-small ml-2">Download</a>
            {/if}
        </div>
        <button on:click={() => {navbar = !navbar}} class="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                {#if navbar}
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                {/if}
            </svg>
        </button>
    </div>
</nav>

<div class="fixed top-16 h-full w-full left-0 p-4 pb-20 flex md:hidden flex-col gap-2 justify-center items-center bg-gray-200/50 backdrop-blur transition-opacity {navbar ? "opacity-100 z-30" : "opacity-0 -z-10"}">
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
                <a href="/auth" class="button-secondary button-small">Log-in</a>
            {:else}
                <a href="/dashboard" class="button-secondary button-small">Dashboard</a>
            {/if}
        </li>
        {#if extension !== "blank"}
            <li>
                <a href="{extension.link}" class="button-primary button-small">Download</a>
            </li>
        {/if}
    </ul>
</div>