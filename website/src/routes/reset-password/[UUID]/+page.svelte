<script>
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let isLoading = false;
</script>

<svelte:head>
	<title>PCC - Reset password</title>
</svelte:head>

<div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow">
    <form class="rounded-lg md:p-10 p-6  bg-transparent text-start transition-all border border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST" action="?/resetPassword" use:enhance>
        <h1 class="mb-4">New password</h1>

        <input type="password" placeholder="New password" name="password" id="password" value="{form?.formData?.username || ''}" class="mb-4">
        {#if form?.success}
            <div class="flex flex-row gap-2 items-center bg-green-100 text-green-900 border border-green-600 mb-4 rounded-lg p-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                    Your password has successfully been changed. you can now <a class="link" href="/auth">log-in</a> into your account.
                </div>
            </div>
        {:else}
            {#if form?.error || data?.error}
                <div class="flex flex-row gap-2 items-center text-red-900 bg-red-100 border border-red-600 rounded-lg mb-4 p-4 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {form?.message ?? data.message}
                </div>
            {/if}
        {/if}
        <button class="button-primary" type="submit" disabled="{isLoading || form?.error || data?.error || form?.success}">
            {#if isLoading}
                <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
                </svg>
            {/if}
            Change password
        </button>
    </form>
</div>