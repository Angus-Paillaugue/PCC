<script>
  import { twMerge } from 'tailwind-merge';

  const props = $$restProps;
  const baseClasses = 'w-6 h-6 animate-spin';
  const spinnerClasses = twMerge(baseClasses, props.class);
  delete props.class;
</script>

<svg
  fill="none"
  class={spinnerClasses}
  viewBox="0 0 32 32"
  xmlns="http://www.w3.org/2000/svg"
  ><path
    clip-rule="evenodd"
    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
    fill="currentColor"
    fill-rule="evenodd"
  /></svg
>
