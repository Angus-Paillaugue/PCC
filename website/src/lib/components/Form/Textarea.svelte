<script>
    import { twMerge } from 'tailwind-merge';

    const props = $$restProps;
    export let value = "";
    
    const baseClasses = "border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white dark:focus:ring-offset-neutral-900 focus:ring-offset-2 focus:ring-2";
    const textareaClasses = twMerge(baseClasses, props.class);
    delete props.class;
    delete props.value;
</script>

<label for={props.name} class="flex flex-col gap-1">
    {#if props?.label}
        {props.label}
    {/if}
    <textarea class={textareaClasses} {...props} bind:value></textarea>
</label>