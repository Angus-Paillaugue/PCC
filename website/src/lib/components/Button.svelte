<script>
    import { twMerge } from 'tailwind-merge';
    import Icon from '@iconify/svelte';

    export let color = "primary";
    export let buttonType = "button";
    export let href = "";
    export let icon = "none";
    export let size = "normal";
    export let animationTo = "none";
    export let iconPosition = "right";
    export let iconClasses = "";
    export let disabled = false;
    const props = $$restProps;
    
    const baseButtonClasses = {
        "primary": "text-white bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-800 disabled:bg-primary-400 dark:disabled:bg-primary-500 shadow-primary-700 dark:shadow-primary-500 hover:shadow-md hover:dark:shadow-sm inline-flex flex-row items-center justify-center gap-2 font-semibold transition-all duration-200 hover:rounded-lg rounded-3xl focus:outline-none disabled:cursor-not-allowed relative overflow-hidden",

        "primary-dark": "text-white bg-primary-700 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-900 disabled:bg-primary-500 dark:disabled:bg-primary-600 shadow-primary-800 dark:shadow-primary-600 hover:shadow-md hover:dark:shadow-sm inline-flex flex-row items-center justify-center gap-2 font-semibold transition-all duration-200 hover:rounded-lg rounded-3xl focus:outline-none disabled:cursor-not-allowed relative overflow-hidden",

        "red": "bg-red-600 hover:bg-red-700 disabled:bg-red-400 shadow-red-700 dark:shadow-red-500 hover:shadow-lg hover:dark:shadow-sm inline-flex flex-row items-center justify-center gap-2 font-semibold transition-all duration-200 hover:rounded-lg rounded-3xl focus:outline-none disabled:cursor-not-allowed relative text-white dark:bg-red-800 dark:hover:bg-red-900 overflow-hidden",

        "secondary": "text-neutral-900 bg-neutral-300 disabled:bg-neutral-400 hover:shadow-sm hover:dark:shadow-sm inline-flex flex-row items-center justify-center gap-2 font-semibold transition-all duration-200 hover:rounded-lg rounded-3xl focus:outline-none disabled:cursor-not-allowed relative overflow-hidden dark:bg-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-100"
    }
    const buttonSizes = {
        "normal": "px-5 py-2 sm:py-3 sm:px-8 text-sm sm:text-base",
        "small": "px-3 py-1 sm:py-2 sm:px-5 text-sm",
        "large": "px-7 py-3 sm:py-4 sm:px-10 text-base sm:text-lg",
        "none": ""
    }
    const baseIconClasses = "transition-all duration-200 w-5 h-5";

    const buttonAnimations = {
        "up": "group w-fit",
        "left": "sm:hover:pr-14 w-fit group",
        "grow": "group",
        "rotate": "group",
        "none": ""
    }
    const iconAnimations = {
        "up": "w-6 h-6 transition-all duration-200 group-hover:top-1/2 group-hover:-translate-y-1/2 absolute top-full left-1/2 -translate-x-1/2",
        "left": "w-5 h-5 absolute right-0 flex items-center justify-start duration-300 transform translate-x-full group-hover:-translate-x-full ease",
        "grow": "",
        "rotate": "group-hover:rotate-[360deg] duration-300",
        "none": ""
    }
    
    const finalButtonClasses = twMerge(baseButtonClasses[color], props.class, buttonSizes[size], buttonAnimations[animationTo]);
    const finalIconClasses = twMerge(baseIconClasses, iconAnimations[animationTo], iconClasses);
    delete props.class;
    delete props.href;
</script>

{#if buttonType === "button"}
    <button {...props} class={finalButtonClasses} on:click disabled={disabled}>
        {#if iconPosition === "right"}
            <slot />
        {/if}
        {#if animationTo === "grow"}
            <svg class="relative w-6 h-6 transition-all group-hover:translate-x-[4px]" viewBox="0 0 16 16" fill="none">
                <path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
                <path class="transition-all group-hover:[stroke-dashoffset:20] [stroke-dasharray:10] [stroke-dashoffset:10]" stroke="currentColor" d="M1.75 8H11" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
        {:else}
            {#if icon}
                <Icon icon={icon} class={finalIconClasses} />
            {/if}
        {/if}
        {#if iconPosition === "left"}
            <slot />
        {/if}
    </button>
{:else}
    <a {...props} href={href} class={finalButtonClasses} on:click>
        {#if iconPosition === "right"}
            <slot />
        {/if}
        {#if animationTo === "grow"}
            <svg class="relative w-6 h-6 transition-all group-hover:translate-x-[4px]" viewBox="0 0 16 16" fill="none">
                <path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
                <path class="transition-all group-hover:[stroke-dashoffset:20] [stroke-dasharray:10] [stroke-dashoffset:10]" stroke="currentColor" d="M1.75 8H11" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
        {:else}
            {#if icon}
                <Icon icon={icon} class={finalIconClasses} />
            {/if}
        {/if}
        {#if iconPosition === "left"}
            <slot />
        {/if}
    </a>
{/if}
