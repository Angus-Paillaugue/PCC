<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import Analytics from '$lib/components/Analytics.svelte';
    import { toasts, removeToast } from "$lib/stores";

    export let data;

    const { extensions, getBrowserType } = data;

    let extension = extensions[0];
    let user;
    let navbar = false;

    $: user = data.user;
    $: if($toasts.length > 5) {$toasts = $toasts.slice(0, 5)};

    onMount(() => {
        if(extensions.filter(el => el.plateforme === getBrowserType()).length > 0){
            extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        }else {
            extension = "blank";
        }
    });
</script>

<Analytics />

<div class="fixed top-2 right-2 flex flex-col gap-2 z-50">
    {#each $toasts as toast, i (toast)}
        {#if toast.type == "error"}
            <div class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                    </svg>
                    <span class="sr-only">Error icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">{toast.message}</div>
                <button type="button" on:click={() => {removeToast(i)}} class="ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        {:else if toast.type == "success"}
            <div class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                </div>
                <div class="ms-3 text-sm font-normal">{toast.message}</div>
                <button type="button" on:click={() => {removeToast(i)}} class="ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        {/if}
    {/each}
</div>


<main class="flex flex-col min-h-screen">
    <nav class="px-4 py-2 border-b bg-neutral-100/50 backdrop-blur-lg z-40 border-neutral-200 fixed top-0 left-0 w-full h-16">
        <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full">
            <a href="/" class="h-full"><img src="/128-icon.png" alt="" class="h-full"></a>

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

    <div class="h-16 w-full"></div>
    
    <slot />
    
    <footer class="w-full p-4 flex items-center justify-center border-t question.postedAt mt-4">
        <p>Angus Paillaugue | 2023 - {new Date().getFullYear()}</p>
    </footer>
</main>