<script>
    import { newToast } from "$lib/stores";
    import { copy } from 'svelte-copy';

    export let data;

    const { supportEmail } = data;
</script>

<svelte:head>
    <title>PCC - Terms of service</title>
</svelte:head>

<section class="grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full">
    
    <h2>Terms of service</h2>

    <h5 class="mt-4">1. Acceptance of Terms</h5>
    <p>By accessing and using PCC, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the website and extension.</p>

    <h5 class="mt-4">2. Use of Services</h5>
    <p>You agree to use the services provided by PCC in compliance with all applicable laws and regulations. You also agree not to:</p>
    <ul class="text-base font-normal list-inside list-disc">
        <li>Use the services for any illegal or unauthorized purpose.</li>
        <li>Attempt to gain unauthorized access to any part of the website and it's services.</li>
        <li>Interfere with the normal functioning of the website and it's services.</li>
    </ul>

    <h5 class="mt-4">3. User Accounts</h5>
    <p>Some features of PCC may require you to create an account. You are responsible for maintaining the confidentiality of your account information and agree to notify us of any unauthorized use of your account.</p>

    <h5 class="mt-4">4. Paid Features</h5>
    <p>Certain features of PCC may be offered for a fee. By purchasing these features, you agree to the specified payment terms. All payments are non-refundable.</p>

    <h5 class="mt-4">5. Intellectual Property</h5>
    <p>PCC and its content are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.</p>

    <h5 class="mt-4">6. Disclaimer</h5>
    <p>PCC is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy or completeness of the information on the website and it's services.</p>

    <h5 class="mt-4">7. Limitation of Liability</h5>
    <p>PCC and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website and it's services.</p>

    <h5 class="mt-4">8. Changes to Terms</h5>
    <p>We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website constitutes acceptance of the revised terms.</p>

    <h5 class="mt-4">9. Contact Us</h5>
    <p>If you have any questions or concerns about these Terms of Service, please contact us at <button class="font-semibold" use:copy={supportEmail} on:svelte-copy={() => {newToast("success", "Copied to clipboard successfully!")}} on:svelte-copy:error={() => {newToast("error", "An error occurred while copying to the clipboard")}}>{supportEmail}</button>.</p>
</section>