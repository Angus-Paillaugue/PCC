<script>
    import { newToast } from "$lib/stores";
    import { copy } from 'svelte-copy';

    export let data;

    const { supportEmail } = data;
</script>

<svelte:head>
    <title>PCC - Contact us</title>
    <meta name="description" content="Contact PCC">
</svelte:head>

<section class="grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full">
    
    <h2>Contact us</h2>

    <p>You can contact us by sending an e-mail to <button class="font-semibold" use:copy={supportEmail} on:svelte-copy={() => {newToast("success", "Copied to clipboard successfully!")}} on:svelte-copy:error={() => {newToast("error", "An error occurred while copying to the clipboard")}}>{supportEmail}</button></p>

</section>