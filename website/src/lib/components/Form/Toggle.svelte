<script>
    export let checked = false;
    export let id;

    const props = $$restProps

    delete props.checked;
</script>

<div class="switch-wrapper" {...props}>
    <input type="checkbox" id={id} class="hidden" bind:checked on:change/>
    <label for={id}><span><em></em></span></label>
</div>