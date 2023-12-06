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

<section class="grow p-4 lg:p-6 mx-auto max-w-4xl w-full">
    
    <h2>Contact us</h2>

    <p>You can contact us by sending an e-mail to <button class="font-semibold" use:copy={supportEmail} on:svelte-copy={() => {newToast("success", "Copied to clipboard successfully!")}} on:svelte-copy:error={() => {newToast("error", "An error occurred while copying to the clipboard")}}>{supportEmail}</button></p>

</section>