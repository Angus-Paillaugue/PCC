<script>
    import "../app.css";
    import Analytics from '$lib/components/Analytics.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    import CookieModal from "$lib/components/CookieModal.svelte";
    import Banner from "$lib/components/Banner.svelte";
    import Toasts from "$lib/components/Toasts.svelte";
</script>

<Analytics />
<CookieModal />
<Banner />
<Toasts />

<main class="flex flex-col min-h-screen">
    <NavBar />

    <div class="grow pt-16 w-full">
        <slot />
    </div>
    
    <Footer />
</main>