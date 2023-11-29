<script>
    import { toasts, removeToast } from "$lib/stores";
    import Icon from '@iconify/svelte';
    
    $: if($toasts.length > 5) {$toasts = $toasts.slice(0, 5)};
</script>

<div class="fixed top-2 right-2 flex flex-col gap-2 z-50 sm:bottom-0 pointer-events-none">
    {#each $toasts as toast, i (toast)}
        {#if toast.type == "error"}
            <div class="flex items-center w-full sm:max-w-xs max-sm-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 pointer-events-auto" role="alert">
                <Icon icon="heroicons:exclamation-circle-solid" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200" />
                <div class="ms-3 text-sm font-normal">{toast.message}</div>
                <button type="button" on:click={() => {removeToast(i)}} class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <Icon icon="heroicons:x-mark" />
                </button>
            </div>
        {:else if toast.type == "success"}
            <div class="flex items-center w-full sm:max-w-xs max-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 gap-2 pointer-events-auto" role="alert">
                <Icon icon="heroicons:check-circle-solid" class="flex items-center justify-center flex-shrink-0 h-6 w-6 sm:w-8 sm:h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200" />
                <div class="text-sm font-normal grow">{toast.message}</div>
                <button type="button" on:click={() => {removeToast(i)}} class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 flex-shrink-0" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <Icon icon="heroicons:x-mark" />
                </button>
            </div>
        {/if}
    {/each}
</div>