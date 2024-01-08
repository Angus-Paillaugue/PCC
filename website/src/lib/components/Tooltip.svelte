<script>
  import { twMerge } from 'tailwind-merge';

  export let text;
  export let position = 'top';

  const props = $$restProps;

  const tooltipClasses = twMerge(props.classes, `tooltip tooltip-${position}`);

  delete props.classes;
  delete props.text;
  delete props.position;
</script>

<div {...props} class={tooltipClasses} data-tooltip={text}>
  <slot />
</div>
