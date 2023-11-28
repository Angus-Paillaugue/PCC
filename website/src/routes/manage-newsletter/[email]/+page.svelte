<script>
    import { newToast } from "$lib/stores";
    
    export let data;

    const { settings } = data;

    async function updateSettings() {
        const res = await fetch(`/api/updateNewsletter`, { method: 'POST', body: JSON.stringify({ settings }) });
        data = await res.json();
        newToast("success", data.message);
    }
</script>

<section class="p-4 md:p-6 lg:p-10 pt-24 flex flex-col items-center gap-10 max-sm:pl-6 max-w-screen-xl w-full mx-auto grow">

    <div class="border-neutral-200 border dark:border-neutral-700 rounded-lg p-6 flex flex-col gap-4">
        {#if settings}
            <h6 class="font-normal">Your e-mail : <b>{settings.email}</b></h6>
        
            <div class="flex flex-row gap-2">
                <p>Receive e-mails : </p>
                <div class="switch-wrapper">
                    <input type="checkbox" id="darkMode" class="hidden" bind:checked={settings.sendEmails} on:change={updateSettings}/>
                    <label for="darkMode"><span><em></em></span></label>
                </div>
            </div>
        {:else}
            <h6 class="font-normal">You are not subscribed to the newsletter, click <a href="/#newsletter" class="link">here</a> to register.</h6>
        {/if}
    </div>
</section>