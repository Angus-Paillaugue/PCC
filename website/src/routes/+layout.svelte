<script>
    import "../app.css";
    import { onMount } from 'svelte';

    export let data;

    const { extensions, getBrowserType } = data;

    let extension = extensions[0];

    onMount(() => {
        if(extensions.filter(el => el.plateforme === getBrowserType()).length > 0){
            extension = extensions.filter(el => el.plateforme === getBrowserType())[0]
        }else {
            extension = "blank"
        }
    });
</script>

<nav class="px-4 py-2 border-b border-neutral-200">
    <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-14">
        <a href="/" class="h-full"><img src="/128-icon.png" alt="" class="h-full"></a>

        <div class="flex flex-row gap-4">
            <a href="/help" class="button-secondary w-fit">Get help</a>
            
            {#if extension !== "blank"}
                <a href="{extension.link}" class="button-primary w-fit">Download</a>
            {/if}
        </div>
    </div>
</nav>

<slot />