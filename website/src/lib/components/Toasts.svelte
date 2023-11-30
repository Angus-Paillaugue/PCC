<script>
    import { toasts, removeToast } from "$lib/stores";
    import Icon from '@iconify/svelte';
    import CloseButton from "$lib/components/CloseButton.svelte";
    
    $: if($toasts.length > 5) {$toasts = $toasts.slice(0, 5)};

    const iconsClasses = "inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg";
    const baseToastClasses = "flex items-center w-full sm:max-w-xs max-sm-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 gap-2 pointer-events-auto";
</script>

<div class="fixed top-2 right-2 flex flex-col gap-2 z-50 sm:bottom-0 pointer-events-none">
    {#each $toasts as toast, i (toast)}
        <div class={baseToastClasses} role="alert">
            <div class="p-1 rounded-xl {toast.type === "success" ? "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200" : "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"}">
                <Icon icon={toast.type === "success" ? "heroicons:check-circle-solid" : "heroicons:exclamation-circle-solid"} class={iconsClasses} />
            </div>
            <div class="ms-3 text-sm font-normal">{toast.message}</div>
            <CloseButton on:click={() => {removeToast(i)}} class="flex-shrink-0 ml-2 sm:ml-4" />
        </div>
    {/each}
</div>