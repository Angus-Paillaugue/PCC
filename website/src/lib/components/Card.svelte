<script>
    import { twMerge } from 'tailwind-merge';
    
    const props = $$restProps;

    const baseCardClasses = "rounded-lg w-full bg-neutral-100 dark:bg-gray-800 flex flex-col gap-2 md:p-10 p-6 h-full";
    const cardClasses = twMerge(baseCardClasses, props.class);
    delete props.class;
</script>

<div class={cardClasses} {...props}>
    <slot />
</div>