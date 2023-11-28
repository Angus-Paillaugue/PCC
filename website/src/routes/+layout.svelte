<script>
    import "../app.css";
    import Analytics from '$lib/components/Analytics.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    import CookieModal from "$lib/components/CookieModal.svelte";
    import Banner from "$lib/components/Banner.svelte";
    import Toasts from "$lib/components/Toasts.svelte";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { theme } from '$lib/stores';
    import { onMount } from "svelte";
    
    inject({ mode: dev ? 'development' : 'production' });

    onMount(() => {
        setTheme();
    });

    function setTheme() {
        if(typeof(document) === undefined) return;
        if($theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
    }
</script>

<svelte:head>
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3748048,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
</svelte:head>

<Analytics />
<CookieModal />
<Banner />
<Toasts />

<main class="flex flex-col">
    <NavBar />

    <div class="min-h-screen pb-4 pt-16 w-full flex flex-col items-center">
        <slot />
    </div>
    
    <Footer />

    <div class="right-2 bottom-4 fixed z-40">
        <button class="group w-8 h-8 rounded-full shadow cursor-pointer bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100" on:click|preventDefault={() => {$theme = $theme === "light" ? "dark" : "light"; setTheme();}}>
            {#if $theme === "light"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:fill-yellow-300 dark:opacity-0 opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:rotate-45"><path stroke-linecap="round" class="transition-[fill]" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:fill-gray-700 opacity-0 dark:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"><path stroke-linecap="round" class="transition-[fill]" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            {/if}
        </button>
    </div>
</main>