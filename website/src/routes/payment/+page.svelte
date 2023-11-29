<script>
    import { onMount } from "svelte";
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, CardNumber, CardExpiry, CardCvc } from '$lib/components/payment';
    import { PUBLIC_STRIPE_KEY } from '$env/static/public';
    import Alert from '$lib/components/Form/Alert.svelte';
    import Spinner from '$lib/components/Form/Spinner.svelte';

    export let data;

    const { premiumPrice } = data;
    let stripe;
    let cardElement;
    let processing = false;
    let alert = { message:"", display:false, type:"error" };

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    });

    async function createPaymentIntent() {
        const response = await fetch('/payment-intent', { method: 'POST' });
        const data = await response.json();
        
        if(data.error) {
            return { error:data.message };
        }else {
            return { clientSecret:data.clientSecret };
        }
    }
    
    async function submit() {
        if (processing) return;
        processing = true;
        alert.display = false;
        
        const intent = await createPaymentIntent();
        if(intent.error){
            alert = { message:intent.error, display:true, type:"error" };
        }else {
            // confirm payment with stripe
            const result = await stripe.confirmCardPayment(intent.clientSecret, {
                payment_method: {
                    card: cardElement
                }
            });
            
            if (result.error) {
                alert = { message:result.error.message, display:true, type:"error" };
            } else {
                if(result.paymentIntent.status !== 'succeeded') {
                    alert = { message:'Payment failed', display:true, type:"error" };
                }else {
                    alert = { message:'Congrats! You are now a PCC Pro user! Click on "Refresh Plan" in the PCC extension for your purchase to take effect.', display:true, type:"success" };
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
        <div class="rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 class="text-center">Pay by card</h2>

            <div class="border border-neutral-200 dark:border-neutral-700 roundedlg-md flex flex-col mt-4">
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
                    <CardNumber bind:element={cardElement} classes={{ base: 'border rounded-lg w-full p-4 bg-neutral-100 border-neutral-300 border-neutral-200 dark:border-neutral-600 placeholder-neutral-400' }}/>
                    
                    <div class="flex flex-col md:flex-row gap-4">
                        <CardExpiry classes={{ base: 'border rounded-lg w-full p-4 bg-neutral-100 border-neutral-200 dark:border-neutral-600 placeholder-neutral-400' }} />
                        <CardCvc classes={{ base: 'border rounded-lg w-full p-4 bg-neutral-100 border-neutral-200 dark:border-neutral-600 placeholder-neutral-400' }} />
                    </div>
                    
                    {#if alert.display}
                        <Alert type={alert.type} message={alert.message ?? "Congrats! You are now a PCC Pro user! Click on \"Refresh Plan\" in the PCC extension for your purchase to take effect."} />
                    {/if}
                    
                    <button class="w-full button-primary" disabled="{processing || alert.type === "success"}">
                        {#if processing}
                            <Spinner />
                        {:else}
                            Pay {(premiumPrice/100).toFixed(2)} €
                        {/if}
                    </button>
                </Elements>
            </form>
        </div>
    </section>
{/if}