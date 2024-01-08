<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from '@iconify/svelte';

  export let href = '';
  export let icon = true;
  const props = $$restProps;

  const baseClasses =
    'font-medium text-primary-600 hover:underline cursor-pointer transition-all inline-flex flex-row gap-2 hover:gap-4 items-center w-fit';
  const finalClasses = twMerge(baseClasses, props.class);
  delete props.class;
  delete props.href;
</script>

<a {...props} {href} class={finalClasses} on:click>
  <slot />
  {#if icon}
    <Icon icon="heroicons:arrow-up-right" class="inline w-4 h-4 mt-1" />
  {/if}
</a>
