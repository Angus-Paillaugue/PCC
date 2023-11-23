<script>
    
    export let data;

    const { premiumPrice, user } = data;
</script>

<svelte:head>
    <title>PCC - Pricing</title>
</svelte:head>

<section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold">Choose the plan that fits your needs</h2>
        <p class="mb-5 font-light text-neutral-500 sm:text-xl">Our plans are designed to fit your needs, whether you're a casual user or a power user. Choose the plan that's right for you and enjoy all the features that PCC has to offer.</p>
    </div>
    <div class="space-y-8 grid grid-cols-1 lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
        <!-- Pricing Card -->
        <div class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-neutral-200 w-full h-fit">
            <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
            <p class="font-light text-neutral-500 sm:text-lg">Sufficient for most users</p>
            <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-5xl font-extrabold">FREE</span>
            </div>
            <ul role="list" class="text-left">
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
                <h4 class="text-center rounded-full bg-neutral-200 p-2">Current plan</h4>
            {/if}
        </div>
        <!-- Pricing Card -->
        <div class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border border-neutral-200 w-full h-fit">
            <h3 class="mb-4 text-2xl font-semibold">Pro</h3>
            <p class="font-light text-neutral-500 sm:text-lg">For PandaBuy addicts.</p>
            <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-5xl font-extrabold">${(premiumPrice/100).toFixed(2)}</span>
            </div>
            <ul role="list" class="text-left">
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Access to experimental features</span>
                </li>
            </ul>
            {#if user?.isPremium}
                <h4 class="text-center rounded-full bg-neutral-200 p-2 mt-4">Current plan</h4>
            {:else}
                <a href="/payment" class="button-primary button-small mt-4">Choose plan</a>
            {/if}
        </div>
    </div>
</section>