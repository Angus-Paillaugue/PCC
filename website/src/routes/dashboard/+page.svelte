<script>
    import Icon from '@iconify/svelte';
    import Card from '$lib/components/Card.svelte';

    export let data;

    const { user } = data;
</script>

<svelte:head>
    <title>PCC - Dashboard</title>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-lg mx-auto">
    <Card>
        <h3>Welcome {user.username}</h3>
    
        <p>Current plan : <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span></p>
    
        <div class="grid darp-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4">
            <a href="/dashboard/settings" class="card-button">
                <Icon icon="heroicons:cog-6-tooth-solid" class="w-6 h-6" />
                Settings
            </a>
            <a href="/log-out" class="card-button">
                <Icon icon="carbon:logout" class="w-6 h-6" />
                Log-out
            </a>
        </div>
    </Card>
</section>