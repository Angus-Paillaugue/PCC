<script>
    import { enhance } from "$app/forms";
    import { newToast } from "$lib/stores";
    import Modal from "$lib/components/Modal.svelte";
    import Card from "$lib/components/Card.svelte";
    import Alert from "$lib/components/Form/Alert.svelte";
    import TextInput from "$lib/components/Form/TextInput.svelte";
    import Icon from '@iconify/svelte';
    import Spinner from "$lib/components/Form/Spinner.svelte";
  import Button from "../../../lib/components/Button.svelte";

    export let data;
    export let form;

    let { user } = data;
    let isAccountFormLoading = false;
    let deleteAccountModal = false;
    let isPasswordFormLoading = false;

    $: if(form) {
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
    <Button buttonType="link" href="../" size="small" class="w-fit" color="secondary" iconPosition="left" animationTo="rotate" icon="heroicons:arrow-uturn-left">Go back</Button>
    
    <Card>
        <form action="?/save" method="POST" use:enhance={() => {isAccountFormLoading = true;return async ({ update }) => {isAccountFormLoading = false; update({ reset: false });};}} class="flex flex-col gap-4 h-fit w-full">
            <h3>Account</h3>
    
            <TextInput label="Username" name="email" placeholder="Username" value="{user.username}" type="text" />

            <TextInput label="E-mail" name="email" placeholder="E-mail" value="{user.email}" type="email" />
    
            <Alert display={form?.account?.success ?? false} type="error" class="mb-4" message={form?.account?.message} />
    
            <Button buttonType="button" color="primary">
                {#if isAccountFormLoading}
                    <Spinner />
                {:else}
                    Save
                {/if}
            </Button>
        </form>
    </Card>

    <hr>

    <Card>
        <form action="?/password" method="POST" class="flex flex-col gap-4 h-fit w-full" use:enhance={() => {
            isPasswordFormLoading = true;
            return async ({ update }) => {
                isPasswordFormLoading = false; 
                update({ reset: false });};
            }
        }>
            <h3>Password</h3>
    
            <TextInput label="Current password" name="email" placeholder="Current password" id="currentPassword" type="password" />
            
            <TextInput label="New password" name="email" placeholder="New password" id="newPassword" type="password" />
    
            <Alert display={form?.password?.success ?? false} type="error" class="mb-4" message={form?.password?.message} />

            <Button buttonType="button" color="primary">
                {#if isAccountFormLoading}
                    <Spinner />
                {:else}
                Change password
                {/if}
            </Button>
    
        </form>
    </Card>

    <hr>

    <Card>
        <h3>Danger zone</h3>
    
        <Button buttonType="button" color="red" on:click={() => {deleteAccountModal = true;}}>Delete account</Button>
    </Card>
</section>

<Modal title="Delete account" bind:status={deleteAccountModal}>

    <p slot="body">Are you sure you want to delete your account?</p>

    <svelte:fragment slot="footer">
        <Button buttonType="button" color="secondary" on:click={() => {deleteAccountModal = false;}}>No, cancel</Button>
        <form action="?/deleteAccount" method="POST">
            <Button buttonType="button" color="red" class="w-full" type="submit">Yes, delete</Button>
        </form>
    </svelte:fragment>

</Modal>