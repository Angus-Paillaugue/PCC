<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; 
    import Icon from '@iconify/svelte';
    import Button from '$lib/components/Button.svelte';

    let user;
    let extensions = $page.data.extensions;
    let getBrowserType = $page.data.getBrowserType;
    let extension = extensions[0];
    let navbar = false;
    let navLinkUnderline;
    $: user = $page.data.user;

    function setActiveTab() {
        if(!document) {
            setTimeout(() => {
                setActiveTab();
            }, 100);
            return
        }
        const sections = document.querySelectorAll('.nav-link');
        const setTheme = (link) => {
            // Remove the active styles from all the links
            document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.remove('text-primary-600');
                el.classList.add('text-white', 'dark:text-neutral-100', 'hover:text-neutral-200', 'dark:hover:text-primary-500', 'underline');
            });
            // If the page url is not accessible thru the navbar, hide the underline
            if(!link) {navLinkUnderline.style.display = "none"; return};
            // Else, set the underline to the link
            navLinkUnderline.style.display = "block";
            navLinkUnderline.style.left = link.offsetLeft-10+"px";
            navLinkUnderline.style.width = link.clientWidth+10*2+"px";
            link.classList.add("text-primary-600");
            link.classList.remove('text-white', 'dark:text-neutral-100', 'hover:text-neutral-200', 'dark:hover:text-primary-500', 'underline');
        }

        for (const section of sections) {
            if (section.getAttribute('href').includes($page.route.id.slice(1))) {
                setTheme(section);
                return;
            }
        }
        setTheme(null);
    }

    $: $page.route.id && browser && navLinkUnderline && setActiveTab();

    onMount(() => {
        if(extensions.filter(el => el.plateforme === getBrowserType()).length > 0){
            extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        }else {
            extension = "blank";
        }

        setActiveTab();
        window.onresize = setActiveTab;
    });
</script>

<nav class="top-6 left-1/2 -translate-x-1/2 px-6 md:pr-2 bg-primary-500 dark:bg-primary-700 transition-all duration-75 {navbar ? "md:rounded-3xl max-md:rounded-t-3xl" : "rounded-3xl"} z-40 fixed max-w-screen-2xl w-[calc(100%-1rem)] flex flex-row justify-between items-center gap-6 h-14 shadow-md">
    <div class="relative">
        <div class="relative grid grid-cols-3 md:gap-8 gap-4 z-10">
            <a href="/" class="nav-link font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200">Home</a>
            <a href="/help" class="nav-link font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200">Get help</a>
            <a href="/pricing" class="nav-link font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200">Pricing</a>
        </div>
        <span bind:this={navLinkUnderline} class="h-8 -top-1 transition-all bg-white rounded-full absolute duration-75"></span>
    </div>
    <div class="max-md:hidden">
        {#if !user}
            <Button buttonType="link" href="/auth" size="small" color="secondary">Log-in</Button>
        {:else}
            <Button buttonType="link" href="/dashboard" size="small" color="secondary">Dashboard</Button>
        {/if}
        {#if extension !== "blank"}
            <Button buttonType="link" href={extension.link} size="small" color="primary-dark" class="ml-2">Download</Button>
        {/if}
    </div>
    <button on:click={() => {navbar = !navbar}} class="md:hidden">
        {#if navbar}
            <Icon icon="heroicons:x-mark-solid" class="w-6 h-6" />
        {:else}
            <Icon icon="heroicons:bars-3-solid" class="w-6 h-6" />
        {/if}
    </button>
</nav>

<div class="fixed top-20 left-1/2 -translate-x-1/2 flex flex-col items-center rounded-b-3xl max-w-screen-2xl w-[calc(100%-1rem)] md:hidden bg-neutral-200 dark:bg-neutral-900 transition-all z-30 overflow-hidden duration-300 gap-4 text-center {navbar ? "max-h-96 p-4" : "max-h-0"}">
    <a href="/" class="font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200 w-fit" on:click={() => {navbar = false;}}>Home</a>
    <a href="/help" class="font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200 w-fit" on:click={() => {navbar = false;}}>Get help</a>
    <a href="/pricing" class="font-medium underline block text-center text-white dark:text-neutral-100 hover:text-neutral-200 dark:hover:text-primary-500 transition-all duration-200 w-fit" on:click={() => {navbar = false;}}>Pricing</a>
    {#if !user}
        <Button buttonType="link" href="/auth" size="small" color="secondary">Log-in</Button>
    {:else}
        <Button buttonType="link" href="/dashboard" size="small" color="secondary">Dashboard</Button>
    {/if}
    {#if extension !== "blank"}
        <Button buttonType="link" href={extension.link} size="small" color="primary">Download</Button>
    {/if}
</div>
<!-- <nav class="px-4 py-2 border-b bg-neutral-100/50 dark:bg-neutral-900/80 backdrop-blur-lg z-40 border-neutral-200 dark:border-neutral-700 fixed top-0 left-0 w-full h-16">
    <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full">
        <a href="/" class="h-full" name="homeIcon"><img src="/logos/128-icon.png" alt="" class="h-full"></a>

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
</nav> -->
