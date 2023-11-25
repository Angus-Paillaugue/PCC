<script>
    import { onMount } from 'svelte';

    let cookieModal = false;

    onMount(() => {
        if(!localStorage.getItem("acceptsCookies")) cookieModal = true;
    });
</script>

{#if cookieModal}
    <div class="fixed top-0 left-0 z-50 flex flex-col items-start justify-end w-full h-full p-6 bg-neutral-500/50 dark:bg-neutral-900/50">
        <div class="flex flex-col w-full max-w-sm p-6 space-y-4 bg-white rounded-lg dark:bg-neutral-800">
            <img src="https://www.svgrepo.com/show/30963/cookie.svg" class="w-1/3 mx-auto" alt="">
            <p>We use cookies to provide a better user experience.</p>
            <div class="flex flex-row items-center justify-between">
                <a href="/privacy-policy" class="text-sm link">Privacy Policy</a>
                <button class="button-primary"
                    on:click={() => {
                        localStorage.setItem("acceptsCookies", true);
                        cookieModal = false;
                    }}
                >Accept</button>
            </div>
        </div>
    </div>
{/if}