<script>
    import { twMerge } from 'tailwind-merge';
    import Icon from '@iconify/svelte';

    const props = $$restProps
    const baseClasses = "group p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all";

    const classes = twMerge(baseClasses, props.class);
    delete props.class;
</script>

<button type="button" aria-label="Close" on:click class={classes} {...props}>
    <span class="sr-only">Close</span>
    <Icon icon="heroicons:x-mark-solid" class="w-6 h-6 transition-all group-hover:rotate-90" />
</button>