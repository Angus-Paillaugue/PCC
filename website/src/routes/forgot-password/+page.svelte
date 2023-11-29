<script>
    import { enhance } from '$app/forms';
    import Card from '$lib/components/Card.svelte';
    import Alert from '$lib/components/Form/Alert.svelte';
    import TextInput from '$lib/components/Form/TextInput.svelte';
    import Spinner from '$lib/components/Form/Spinner.svelte';

    export let form;
    let isSending = false;
</script>

<svelte:head>
	<title>PCC - Forgot password</title>
</svelte:head>

<div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow">
    <Card class="max-w-md mx-auto">
        <form class="text-start transition-all w-full flex flex-col" method="POST" use:enhance={() => {
            isSending = true;
            return ({ update }) => {
                isSending = false;
                update({ reset: false });
            }
        }}>
            <h1 class="mb-4">Forgot password</h1>

            <TextInput label="Username" type="text" placeholder="Username" name="username" id="username" value="{form?.formData?.username}" class="mb-4" />
    
            {#if !!(form?.success || form?.error)}
                <Alert type={form?.success ? "success" : "error"} message={form?.message} class="mb-4" />
            {/if}

            <button class="button-primary" type="submit" disabled="{isSending || form?.success}">
                {#if isSending}
                    <Spinner />
                {/if}
                Reset password
            </button>
            <p>Remember your password ? <a class="link" href="/auth">Log-in</a></p>
        </form>
    </Card>
</div>