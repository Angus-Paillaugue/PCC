<script>
    import { enhance } from '$app/forms';

    export let form;
    let isSending = false;

    $: if(form) isSending = false;
</script>

<svelte:head>
	<title>PCC - Forgot password</title>
</svelte:head>

<div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow">
    <form class="rounded-lg md:p-10 p-6 bg-transparent text-start transition-all border border-gray-200 w-full max-w-md mx-auto flex flex-col" method= "POST" use:enhance on:submit={() => {isSending = true;}}>
        <h1 class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Forgot password</h1>
        <input type="text" placeholder="Username" name="username" id="username" value="{form?.formData?.username || ''}" class="mb-4">

        {#if form?.error}
            <div class="flex flex-row gap-2 items-center text-red-900 bg-red-100 border border-red-600 rounded-lg mb-4 p-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {form.message}
            </div>
        {:else}
            {#if form?.success}
                <div class="flex flex-row gap-2 items-center text-green-900 bg-green-100 border border-green-600 mb-4 rounded-lg p-4 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Go check your email to reset your password.
                </div>
            {/if}
        {/if}
        <button class="button-primary" type="submit" disabled="{isSending || form?.error || form?.success}">
            {#if isSending}
                <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
                </svg>
            {/if}
            Reset password
        </button>
        <p>Remember your password ? <a class="link" href="/auth">Log-in</a></p>
    </form>
</div>