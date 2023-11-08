<script>
    export let data;

    const { user } = data;
</script>

<svelte:head>
    <title>PCC - Dashboard</title>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-lg mx-auto">
    <div class="rounded-lg border-neutral-200 border flex flex-col gap-2 md:p-10 p-6 h-fit">
        <h3>Welcome {user.username}</h3>
    
        <p>Current plan : <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span></p>
    
        <a href="/log-out" class="button-red">Log-out</a>
    </div>
</section>