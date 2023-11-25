<script>
    export let status = false;
    export let closeButton = true;
    export let title;
</script>

<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 dark:bg-neutral-900/50 p-2 {status ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <div class="rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col gap-4 max-w-lg w-full relative">
        {#if closeButton} 
            <button type="button" on:click={() => {status = false;}} class="group absolute top-2 right-2 button-close">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        {/if}

        <h3>{title}</h3>

        <slot name="body"></slot>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
            <slot name="footer"></slot>
        </div>
    </div>
</div>