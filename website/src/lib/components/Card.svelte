<script>
    import { twMerge } from 'tailwind-merge';
    
    const props = $$restProps;

    const baseCardClasses = "rounded-lg w-full border-neutral-200 dark:border-neutral-700 border flex flex-col gap-2 md:p-10 p-6 h-full";
    const cardClasses = twMerge(baseCardClasses, props.class);
    delete props.class;
</script>

<div class={cardClasses} {...props}>
    <slot />
</div>