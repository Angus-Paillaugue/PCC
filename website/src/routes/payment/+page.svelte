<script>
    import { onMount } from "svelte";
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, CardNumber, CardExpiry, CardCvc } from '$lib/components/payment';
    import { PUBLIC_STRIPE_KEY } from '$env/static/public';

    export let data;

    const { premiumPrice } = data;
    let stripe;
    let cardElement;
    let processing = false;
    let error;
    let success;

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    });

    async function createPaymentIntent() {
        const response = await fetch('/payment-intent', { method: 'POST' });
        const data = await response.json();
        
        if(data.error) {
            return{ error:data.message };
        }else {
            return { clientSecret:data.clientSecret };
        }
    }
    
    async function submit() {
        if (processing) return;
        processing = true;
        error = null;
        
        const intent = await createPaymentIntent();

        if(intent.error){
            error = { message:intent.error };
        }else {
            // confirm payment with stripe
            const result = await stripe.confirmCardPayment(intent.clientSecret, {
                payment_method: {
                    card: cardElement
                }
            });
            
            if (result.error) {
                error = result.error;
            } else {
                if(result.paymentIntent.status === 'succeeded') {
                    success = true;
                }else {
                    error = { message: 'Payment failed' };
                }
            }
        }

        processing = false;
    }
</script>

<svelte:head>
    <title>PCC - Payment</title>
</svelte:head>

{#if stripe}
    <section class="py-8 px-4 mx-auto max-w-xl lg:py-16 lg:px-6 w-full grow">
        <div class="rounded-lg border border-neutral-200 p-6">
            <h2 class="text-center">Pay by card</h2>

            <div class="border border-neutral-200 roundedlg-md flex flex-col mt-4">
                <div class="flex justify-between items-center px-2">
                    <p>PCC Pro Version</p>
                    <p class="font-semibold">${(premiumPrice/100).toFixed(2)}</p>
                </div>
                <hr class="my-1">
                <div class="flex justify-between items-center px-2">
                    <p>Total :</p>
                    <p class="font-semibold">${(premiumPrice/100).toFixed(2)}</p>
                </div>
            </div>

            <form on:submit|preventDefault={submit} class="flex flex-col gap-4 mt-4">
                <Elements {stripe}>
                    <CardNumber bind:element={cardElement} classes={{ base: 'border rounded-lg w-full p-4 bg-neutral-100 border-neutral-300 placeholder-neutral-400' }}/>
                    
                    <div class="flex flex-col md:flex-row gap-4">
                        <CardExpiry classes={{ base: 'border rounded-lg w-full p-2.5 bg-neutral-100 border-neutral-300 placeholder-neutral-400' }} />
                        <CardCvc classes={{ base: 'border rounded-lg w-full p-2.5 bg-neutral-100 border-neutral-300 placeholder-neutral-400' }} />
                    </div>
                    
                    {#if error}
                        <div class="flex flex-row gap-2 items-center text-red-900 bg-red-100 border border-red-600 rounded-lg p-4 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            {error.message}
                        </div>
                    {/if}

                    {#if success}
                        <div class="flex flex-row gap-2 items-center text-green-900 bg-green-100 border border-green-600 rounded-lg p-4 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            Congrats! You are now a PCC Pro user! Click on "Refresh Plan" in the PCC extension for your purchase to take effect.
                        </div>
                    {/if}
                    
                    {#if !success}
                        <button class="w-full button-primary" disabled="{processing}">
                            {#if processing}
                                <svg fill='none' class="w-8 h-8 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                    <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
                                </svg>
                            {:else}
                                Pay {(premiumPrice/100).toFixed(2)} €
                            {/if}
                        </button>
                    {/if}
                </Elements>
            </form>
        </div>
    </section>
{/if}

<!-- <input type="text" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 border-neutral-300 placeholder-neutral-400 focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2"> -->