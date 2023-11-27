<script>
    import { onMount } from 'svelte';
    import { newToast } from "$lib/stores";
    import { copy } from 'svelte-copy';

    export let data;

    const { supportEmail } = data;
    let websiteLocation;

    onMount(() => {
        websiteLocation = location.hostname;
    });
</script>

<svelte:head>
    <title>PCC - Privacy policy</title>
</svelte:head>

<section class="grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full">
    
    <h2>Privacy Policy</h2>
    <p>Pandabuy Currency Conversion operates the website <a class="link" href="{websiteLocation?.href ?? ""}">{websiteLocation?.hostname ?? "PCC"}</a>. This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.</p>
    <p>By using the Site, you agree to the collection and use of information in accordance with this policy.</p>

    <h5 class="mt-4">1. Information Collection and Use</h5>
    <p>While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, postal address, and phone number ("Personal Information").</p>

    <h5 class="mt-4">2. How We Use Your Information</h5>
    <p>We may use the information we collect for various purposes, including:</p>
    <ul class="text-base font-normal list-inside list-disc">
        <li>Providing, maintaining, and improving our services.</li>
        <li>Personalizing your experience on the website.</li>
        <li>Responding to your inquiries and providing customer support.</li>
        <li>Sending you updates, newsletters, and marketing communications.</li>
        <li>Conducting research and analysis.</li>
    </ul>

    <h5 class="mt-4">3. Log Data</h5>
    <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>

    <h5 class="mt-4">4. Cookies</h5>
    <p>Cookies are files with small amounts of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
    <p>Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>

    <h5 class="mt-4">5. Security</h5>
    <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>

    <h5 class="mt-4">6. Changes to This Privacy Policy</h5>
    <p>This Privacy Policy is effective as of [Date] and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
    <p>We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
    <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website.</p>

    <h5 class="mt-4">7. Contact Us</h5>
    <p>If you have any questions about this Privacy Policy, please contact us at <button class="font-semibold" use:copy={supportEmail} on:svelte-copy={() => {newToast("success", "Copied to clipboard successfully!")}} on:svelte-copy:error={() => {newToast("error", "An error occurred while copying to the clipboard")}}>{supportEmail}</button>.</p>
</section>