<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from '@iconify/svelte';

  export let value;
  export let change;
  export let flow = 'column';

  const props = $$restProps;
  const name = props.name;
  const baseClasses =
    'border text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white dark:focus:ring-offset-neutral-900 focus:ring-offset-2 focus:ring-2 appearance-none peer pr-7';
  const labelClasses = twMerge(
    `inline-block ${flow === 'row' ? 'flex flex-row gap-2 items-center' : ''}`,
    props.class
  );
  delete props.class;
  delete props.name;
</script>

<label for={name} class={labelClasses}>
  {#if props.label}
    {props.label}
  {/if}
  <div class="relative">
    <select {name} bind:value on:change class={baseClasses}>
      <slot />
    </select>
    <Icon
      icon="heroicons:chevron-down-solid"
      class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none bg-transparent"
    />
  </div>
</label>
