<script>
    import CloseButton from "$lib/components/CloseButton.svelte";
    
    export let status = false;
    export let closeButton = true;
    export let title;
</script>

<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 dark:bg-neutral-900/50 p-2 {status ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <div class="rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col gap-4 max-w-lg w-full relative">
        {#if closeButton} 
            <CloseButton on:click={() => {status = false;}} class="absolute top-1 right-1" />
        {/if}

        <h3>{title}</h3>

        <slot name="body"></slot>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
            <slot name="footer"></slot>
        </div>
    </div>
</div>