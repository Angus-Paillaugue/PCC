<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from '@iconify/svelte';

  export let type = 'error';
  export let display = true;
  export let message = 'An error has occurred.';

  const props = $$restProps;

  const svgClasses = 'flex-shrink-0 w-6 h-6 mr-3';
  const baseClasses = {
    error:
      'flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100',
    success:
      'flex items-center p-4 text-sm border rounded-lg text-green-800 border-green-800 bg-green-100 dark:bg-green-600 dark:text-neutral-100',
    info: 'flex items-center p-4 text-sm border rounded-lg text-blue-800 border-blue-800 bg-blue-100 dark:bg-blue-600 dark:text-neutral-100',
  };

  const alertClasses = twMerge(baseClasses[type], props.class);
  delete props.class;
</script>

{#if display}
  <div class={alertClasses} role="alert" {...props}>
    {#if type === 'error'}
      <Icon icon="heroicons:exclamation-circle-solid" class={svgClasses} />
    {:else if type === 'success'}
      <Icon icon="heroicons:check-circle-solid" class={svgClasses} />
    {:else}
      <Icon icon="heroicons:information-circle-solid" class={svgClasses} />
    {/if}
    <span>
      {@html message}
    </span>
  </div>
{/if}
