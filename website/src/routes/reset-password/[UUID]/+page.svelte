<script>
    import { enhance } from '$app/forms';
    import Alert from '$lib/components/Form/Alert.svelte';
    import Spinner from '$lib/components/Form/Spinner.svelte';
    import Button from '$lib/components/Button.svelte';
    import TextInput from '$lib/components/Form/TextInput.svelte';

    export let data;
    export let form;

    let isLoading = false;
</script>

<svelte:head>
	<title>PCC - Reset password</title>
</svelte:head>

<div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow">
    <form class="rounded-lg md:p-10 p-6  bg-transparent text-start transition-all border border-gray-200 dark:border-neutral-700 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST" action="?/resetPassword" use:enhance>
        <h1 class="mb-4">New password</h1>

        <TextInput type="password" placeholder="New password" name="password" id="password" class="mb-4" value="{data?.token}" />

        {#if form?.success || form?.error || data?.error}
            <Alert type={form?.success ? "success" : "error"} message={form?.success ? "Your password has successfully been changed. you can now <a class=\"link\" href=\"/auth\">log-in</a> into your account." : form?.message ?? data.message} />
        {/if}

        <Button disabled={isLoading || form?.success}>
            {#if isLoading}
                <Spinner />
            {:else}
                Change password
            {/if}
        </Button>
    </form>
</div>