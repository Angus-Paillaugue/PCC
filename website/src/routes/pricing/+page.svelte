<script>
    import Card from "$lib/components/Card.svelte";
    import Icon from '@iconify/svelte';
    
    export let data;

    const { premiumPrice, user } = data;
</script>

<svelte:head>
    <title>PCC - Pricing</title>
    <meta name="description" content="PCC pricing page">
</svelte:head>

<section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold">Choose the plan that fits your needs</h2>
        <p class="mb-5 font-light text-neutral-500 sm:text-xl">Our plans are designed to fit your needs, whether you're a casual user or a power user. Choose the plan that's right for you and enjoy all the features that PCC has to offer.</p>
    </div>
    <div class="space-y-8 grid grid-cols-1 lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
        <!-- Pricing Card -->
        <Card class="h-fit">
            <h3>Basic</h3>
            <p class="font-light text-neutral-500 sm:text-lg">Sufficient for most users</p>
            <div class="flex justify-center items-baseline my-8">
                <span class="text-5xl font-extrabold">FREE</span>
            </div>
            <ul role="list" class="text-left">
                <li class="flex items-center space-x-3">
                    <Icon icon="heroicons:check" class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-700" />
                    <span>Currency conversion</span>
                </li>
                <ul class="pl-10 block list-inside list-disc">
                    <li>
                        <span>Currency conversion on websites</span>
                    </li>
                    <li>
                        <span>Choice of currencies to convert to</span>
                    </li>
                </ul>
            </ul>
            {#if !user?.isPremium}
                <h4 class="text-center rounded-full bg-neutral-200 dark:bg-neutral-600 p-2">Current plan</h4>
            {/if}
        </Card>
        <!-- Pricing Card -->
        <Card>
            <h3>Pro</h3>
            <p class="font-light text-neutral-500 sm:text-lg">For PandaBuy addicts.</p>
            <div class="flex justify-center items-baseline my-8">
                <span class="text-5xl font-extrabold">${(premiumPrice/100).toFixed(2)}</span>
            </div>
            <ul role="list" class="text-left">
                <li class="flex items-center space-x-3">
                    <Icon icon="heroicons:check" class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-700" />
                    <span>Currency conversion</span>
                </li>
                <ul class="pl-10 block list-inside list-disc">
                    <li>
                        <span>Currency conversion on websites</span>
                    </li>
                    <li>
                        <span>Choice of currencies to convert to</span>
                    </li>
                </ul>
                <li class="flex items-center space-x-3 mt-4">
                    <Icon icon="heroicons:check" class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-700" />
                    <span>PandaBuy Features</span>
                </li>
                <ul class="pl-10 block list-inside list-disc">
                    <li>
                        <span>Auto redirect</span>
                    </li>
                    <li>
                        <span>Disable product warnings</span>
                    </li>
                    <li>
                        <span>Third party disclaimer auto check</span>
                    </li>
                    <li>
                        <span>Custom product QC</span>
                    </li>
                    <li>
                        <span>Dark mode</span>
                    </li>
                </ul>
                <li class="flex items-center space-x-3 mt-4">
                    <Icon icon="heroicons:check" class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-700" />
                    <span>Yupoo features</span>
                </li>
                <ul class="pl-10 block list-inside list-disc">
                    <li>
                        <span>Interface re-design</span>
                    </li>
                    <li>
                        <span>Custom products grid</span>
                    </li>
                    <li>
                        <span>Side-bar toggle</span>
                    </li>
                    <li>
                        <span>Skip redirect delay</span>
                    </li>
                    <li>
                        <span>Dark mode</span>
                    </li>
                </ul>
                <li class="flex items-center space-x-3 mt-4">
                    <Icon icon="heroicons:check" class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-700" />
                    <span>Access to experimental features</span>
                </li>
            </ul>
            {#if user?.isPremium}
                <h4 class="text-center rounded-full bg-neutral-200 dark:bg-neutral-600 p-2 mt-4">Current plan</h4>
            {:else}
                <a href="/payment" class="button-primary button-small mt-4">Choose plan</a>
            {/if}
        </Card>
    </div>
</section>