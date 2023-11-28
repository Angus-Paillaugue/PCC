<script>
    import { enhance } from "$app/forms";
    import { newToast } from "$lib/stores";
    import Modal from "$lib/components/Modal.svelte";

    export let data;
    export let form;

    let { user } = data;
    let isAccountFormLoading = false;
    let deleteAccountModal = false;
    let isPasswordFormLoading = false;

    $: if(form) {
        console.log(Object.keys(form), Object.keys(form).includes("account"));
        if(Object.keys(form).includes("account")){
            user.username = form.formData.username;
            user.email = form.formData.email;
            if(form.account.success === true) {
                // TODO : Fix toasts
                newToast("success", "Settings saved successfully!");
            }
        }else if (Object.keys(form).includes("password")) {
            if(form.password.success === true) {
                // TODO : Fix toasts
                newToast("success", "Password changed successfully!");
            }
        }
    }
</script>

<svelte:head>
    <title>PCC - Settings</title>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-screen-lg mx-auto">
    <a href="/dashboard" class="button-secondary button-small group w-fit mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        Go back
    </a>
    <form action="?/save" method="POST" use:enhance={() => {isAccountFormLoading = true;return async ({ update }) => {isAccountFormLoading = false; update({ reset: false });};}} class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full">
        <h3>Account</h3>

        <div class="flex flex-col gap-1">
            <p>Username</p>
            <input type="text" name="username" readonly="true" id="username" value="{user.username}">
        </div>

        <div class="flex flex-col gap-1">
            <p>E-mail</p>
            <input type="text" name="email" id="email" value="{user.email}">
        </div>

        {#if form?.account?.success === false}
            <div class="flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100 mb-4" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg>
                {form?.account?.message}
            </div>
        {/if}


        <button class="button-primary w-full">
            {#if isAccountFormLoading}
                <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>
            {:else}
                Save
            {/if}
        </button>
    </form>

    <hr>

    <form action="?/password" method="POST" use:enhance={() => {isPasswordFormLoading = true;return async ({ update }) => {isPasswordFormLoading = false; update({ reset: false });};}} class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full">
        <h3>Password</h3>

        <div class="flex flex-col gap-1">
            <p>Current password</p>
            <input type="password" name="currentPassword" id="currentPassword" placeholder="Current password">
        </div>
        <div class="flex flex-col gap-1">
            <p>New password</p>
            <input type="password" name="newPassword" id="newPassword" placeholder="New password">
        </div>

        {#if form?.password?.success === false}
            <div class="flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100 mb-4" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg>
                {form?.password?.message}
            </div>
        {/if}

        <button class="button-primary">
            {#if isPasswordFormLoading}
                <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>
            {:else}
                Change password
            {/if}
        </button>

    </form>

    <hr>

    <div class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full">
        <h3>Danger zone</h3>

        <button class="button-red" on:click={() => {deleteAccountModal = true;}}>Delete account</button>
    </div>
</section>

<Modal title="Delete account" bind:status={deleteAccountModal}>

    <p slot="body">Are you sure you want to delete your account?</p>

    <svelte:fragment slot="footer">
        <button class="button-secondary" on:click={() => {deleteAccountModal = false;}}>No, cancel</button>
        <form action="?/deleteAccount" method="POST">
            <button class="button-red w-full" type="submit">Yes, delete</button>
        </form>
    </svelte:fragment>

</Modal>