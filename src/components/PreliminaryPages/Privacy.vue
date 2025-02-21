<template>
   <div class="privacy-container">
     <h1>Privacy Policy</h1>
     <p>Last updated: {{ currentYear }}</p>
 
     <section>
       <h2>1. Introduction</h2>
       <p>
         Welcome to Shar Cosmetics. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
       </p>
     </section>
 
     <section>
       <h2>2. Information We Collect</h2>
       <p>
         We may collect the following types of information:
       </p>
       <ul>
         <li><strong>Personal Information:</strong> Name, email address, phone number, and other identifiable information you provide voluntarily.</li>
         <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, pages visited, and time spent on the site.</li>
         <li><strong>Cookies:</strong> We use cookies to enhance your experience and gather usage data. You can manage your cookie preferences through your browser settings.</li>
       </ul>
     </section>
 
     <section>
       <h2>3. How We Use Your Information</h2>
       <p>
         We use the information we collect for the following purposes:
       </p>
       <ul>
         <li>To provide and improve our services.</li>
         <li>To communicate with you, including responding to inquiries and sending updates.</li>
         <li>To analyze website usage and improve user experience.</li>
         <li>To comply with legal obligations and protect our rights.</li>
       </ul>
     </section>
 
     <section>
       <h2>4. Sharing Your Information</h2>
       <p>
         We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
       </p>
       <ul>
         <li>With service providers who assist us in operating our website and providing services.</li>
         <li>When required by law or to protect our legal rights.</li>
         <li>In connection with a business transfer, such as a merger or acquisition.</li>
       </ul>
     </section>
 
     <section>
       <h2>5. Data Security</h2>
       <p>
         We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
       </p>
     </section>
 
     <section>
       <h2>6. Your Rights</h2>
       <p>
         Depending on your location, you may have the following rights regarding your personal information:
       </p>
       <ul>
         <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
         <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
         <li><strong>Deletion:</strong> Request deletion of your data under certain conditions.</li>
         <li><strong>Objection:</strong> Object to the processing of your data for specific purposes.</li>
       </ul>
       <p>
         To exercise these rights, please contact us at [Insert Contact Email].
       </p>
     </section>
 
     <section>
       <h2>7. Third-Party Links</h2>
       <p>
         Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies before providing any personal information.
       </p>
     </section>
 
     <section>
       <h2>8. Changes to This Privacy Policy</h2>
       <p>
         We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
       </p>
     </section>
 
     <section>
       <h2>9. Contact Us</h2>
       <p>
         If you have any questions or concerns about this Privacy Policy, please contact us at:
       </p>
       <p>
         <strong>Email:</strong>info@sharcosmetics.com<br>
         <strong>Address:</strong> P.O BOX.............
       </p>
     </section>
   </div>
 </template>
 
 <script>
 export default {
   name: 'PrivacyPage',
   data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
 };
 </script>
 
 <style scoped>
 .privacy-container {
   max-width: 100%;
   background: linear-gradient(135deg, #b94295, #2c3e50);
   margin: 0 auto;
   padding-right: 12rem;
   padding-left: 12rem;
   padding-top: 2rem;
   padding-bottom: 2rem;
   line-height: 1.6;
 }
 
 h1 {
   font-size: 2.5rem;
   margin-bottom: 1rem;
   text-align: center;
   color: aliceblue;
 }
 
 h2 {
   font-size: 1.75rem;
   margin-top: 2rem;
   margin-bottom: 1rem;
   color: #42b983;
 }
 
 p {
   margin-bottom: 1rem;
   color: aliceblue;
 }
 
 ul {
   margin-bottom: 1rem;
   padding-left: 1.5rem;
   color: aliceblue;
 }
 
 li {
   margin-bottom: 0.5rem;
 }
 
 strong {
   color: #ffffff;
 }
 
 @media (max-width: 768px) {
   .privacy-container {
     padding-right: 1.5rem;
     padding-left: 1.5rem;
   }
 
   h1 {
     font-size: 2rem;
   }
 
   h2 {
     font-size: 1.5rem;
   }
 
   p, ul, li {
     font-size: 0.95rem;
   }
 }
 </style>