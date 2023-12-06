<script>
    import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import TextInput from '$lib/components/Form/TextInput.svelte';
    import Alert from '$lib/components/Form/Alert.svelte';
    import Spinner from "$lib/components/Form/Spinner.svelte";
    import Button from "$lib/components/Button.svelte";

    export let form;

    let sectionsList = [];
    let tabIndex = 0;
    let navLinkUnderline;
    let isFormLoading = false;

    $: setActiveTab(), tabIndex;

    onMount(() => {
        sectionsList = document.querySelectorAll("form");
        setActiveTab();
        window.onresize = setActiveTab;
    });

    function setActiveTab() {
        for(let i = 0;i < sectionsList.length;i++){
            if(i === tabIndex){
                let activeButton = document.querySelector("[data-section*='"+sectionsList[i].id+"']");
                navLinkUnderline.style.left = activeButton.offsetLeft+"px";
                navLinkUnderline.style.width = activeButton.clientWidth+"px";
            }
        }
    }
</script>

<svelte:head>
    <title>PCC - {tabIndex === 0 ? "Log-in" : "Sign-in"}</title>
    <meta name="description" content="{tabIndex === 0 ? "Log-in" : "Sign-in"} to your account">
</svelte:head>

<section class="justify-between w-full grid grid-cols-1 gap-6 lg:grid-cols-2 grow items-center">
    <img src="pandabuyLogo.webp" alt="" class="lg:max-h-96 max-h-64 mx-auto rounded-md">
    <div class="w-full max-lg:flex max-lg:items-center max-lg:flex-col p-2">
        <h1 class="mt-16 mb-10">Join today.</h1>
        <div class="w-full max-w-md">
            <div class="w-full font-medium text-center flex flex-row justify-between relative mb-2">
                <button class="inline-flex items-center justify-center p-4 border-b-2 group w-full transition-all no-scale {tabIndex === 0 ? "rounded-t-lg text-primary-500 dark:text-primary-700" : "rounded-t-lg hover:border-neutral-700 text-text-main border-neutral-200 dark:text-neutral-200 dark:hover:border-neutral-600 dark:border-neutral-900"}" on:click={() => {tabIndex = 0}} data-section="Log-in">Log-in</button>
                <button class="inline-flex items-center justify-center p-4 border-b-2 group w-full transition-all no-scale {tabIndex === 1 ? "rounded-t-lg text-primary-500 dark:text-primary-700" : "rounded-t-lg hover:border-neutral-700 text-text-main border-neutral-200 dark:text-neutral-200 dark:hover:border-neutral-600 dark:border-neutral-900"}" on:click={() => {tabIndex = 1}} data-section="Sign-in">Sign-in</button>
                <span bind:this={navLinkUnderline} class="h-1 transition-all bottom-0 bg-primary-600 dark:bg-primary-700 absolute ease-in-out duration-300"></span>
            </div>

            <div class="relative overflow-hidden grid grid-cols-2 w-full">
                <form class="w-[200%] transition-all ease-in-out duration-300 p-3 pb-5 {tabIndex === 0 ? "translate-x-0" : "translate-x-full"}" method="POST" action="?/login" id="Log-in" use:enhance={() => {
                    isFormLoading = true;
                    return ({ update }) => {
                        isFormLoading = false;
                        update({ reset: false });
                    }
                }}>
                    <TextInput label="Username" name="username" placeholder="Username" value="{form?.logIn?.formData?.username ?? ''}" class="mb-4" maxlength="15" />
                    <TextInput label="Password" name="password" placeholder="Password" value="{form?.logIn?.formData?.password ?? ''}" class="mb-4" type="password" />
            
                    {#if form?.logIn?.success === false}
                        <Alert type="error" class="mb-4" message={form?.logIn?.message} />
                    {/if}

                    <Button buttonType="button" color="primary" disabled={isFormLoading} class="w-full mb-2" animationTo="grow">
                        {#if isFormLoading}
                            <Spinner />
                        {:else}
                            Log-in
                        {/if}
                    </Button>

                    <a href="/forgot-password" class="link">Forgot your password ?</a>
            
                </form>
                <form class="w-[200%] transition-all ease-in-out duration-300 p-3 pb-5 {tabIndex === 1 ? "-translate-x-1/2" : "-translate-x-[150%]"}" method="POST" action="?/signin" id="Sign-in" use:enhance={() => {
                    isFormLoading = true;
                    return ({ update }) => {
                        isFormLoading = false;
                        update({ reset: false });
                    }
                }}>

                    <TextInput label="E-mail" name="email" placeholder="E-mail" value="{form?.signIn?.formData?.email ?? ''}" class="mb-4" />
                    <TextInput label="Username" name="username" placeholder="Username" value="{form?.signIn?.formData?.username ?? ''}" class="mb-4" maxlength="15" />
                    <TextInput label="Password" name="password" placeholder="Password" value="{form?.signIn?.formData?.password ?? ''}" class="mb-4" maxlength="15" type="password" />
            
                    {#if form?.signIn?.success === false}
                        <Alert type="error" class="mb-4" message={form?.signIn?.message} />
                    {/if}

                    <Button buttonType="button" color="primary" disabled={isFormLoading} class="w-full mb-2" animationTo="grow">
                        {#if isFormLoading}
                            <Spinner />
                        {:else}
                            Sign-in
                        {/if}
                    </Button>
                </form>
            </div>
        </div>
    </div>
</section>