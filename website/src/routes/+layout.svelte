<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import Analytics from '$lib/components/Analytics.svelte';

    export let data;

    const { extensions, getBrowserType } = data;

    let extension = extensions[0];
    let user;

    $: user = data.user;

    onMount(() => {
        if(extensions.filter(el => el.plateforme === getBrowserType()).length > 0){
            extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        }else {
            extension = "blank";
        }
    });
</script>

<Analytics />

<svelte:head>
    <script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<main class="flex flex-col min-h-screen">
    <nav class="px-4 py-2 border-b bg-neutral-100/50 backdrop-blur-lg z-40 border-neutral-200 fixed top-0 left-0 w-full h-16">
        <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full">
            <a href="/" class="h-full"><img src="/128-icon.png" alt="" class="h-full"></a>

            <ul class="flex flex-row gap-4">
                <li>
                    <a href="/help" class="nav-link w-fit">Get help</a>
                </li>
                <li>
                    <a href="/pricing" class="nav-link w-fit">Pricing</a>
                </li>
            </ul>
            <div>
                {#if !user}
                    <a href="/auth" class="button-secondary button-small">Log-in</a>
                {:else}
                    <a href="/dashboard" class="button-secondary button-small">Dashboard</a>
                {/if}
                {#if extension !== "blank"}
                    <a href="{extension.link}" class="button-primary button-small ml-2">Download</a>
                {/if}
            </div>
        </div>
    </nav>

    <div class="h-20 w-full"></div>
    
    <slot />
    
    <footer class="w-full p-4 flex items-center justify-center border-t question.postedAt mt-4">
        <p>Angus Paillaugue | 2023 - {new Date().getFullYear()}</p>
    </footer>
</main>