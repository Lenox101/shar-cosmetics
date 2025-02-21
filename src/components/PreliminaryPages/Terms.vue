<template>
   <div class="terms-container">
     <h1>Terms of Service</h1>
     <p>Last updated: {{ currentYear }}</p>
 
     <section>
       <h2>1. Acceptance of Terms</h2>
       <p>
         By accessing or using Cosmetics website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our website or services.
       </p>
     </section>
 
     <section>
       <h2>2. Use of Our Services</h2>
       <p>
         You agree to use our website and services only for lawful purposes and in accordance with these Terms. You must not:
       </p>
       <ul>
         <li>Violate any applicable laws or regulations.</li>
         <li>Infringe on the rights of others.</li>
         <li>Interfere with or disrupt the operation of our website or services.</li>
         <li>Attempt to gain unauthorized access to our systems or data.</li>
       </ul>
     </section>
 
     <section>
       <h2>3. Intellectual Property</h2>
       <p>
         All content on our website, including text, graphics, logos, images, and software, is the property of Shar Cosmetics or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
       </p>
     </section>
 
     <section>
       <h2>4. User Accounts</h2>
       <p>
         If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.
       </p>
     </section>
 
     <section>
       <h2>5. Limitation of Liability</h2>
       <p>
         To the fullest extent permitted by law, Shar Cosmetics shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services. Our total liability to you for any claims shall not exceed the amount you paid to us, if any, for accessing our services.
       </p>
     </section>
 
     <section>
       <h2>6. Termination</h2>
       <p>
         We reserve the right to terminate or suspend your access to our website or services at any time, without notice, for any reason, including if you violate these Terms.
       </p>
     </section>
 
     <section>
       <h2>7. Governing Law</h2>
       <p>
         These Terms shall be governed by and construed in accordance with the law. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the court.
       </p>
     </section>
 
     <section>
       <h2>8. Changes to These Terms</h2>
       <p>
         We may update these Terms from time to time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of our website or services after the changes constitutes your acceptance of the revised Terms.
       </p>
     </section>
 
     <section>
       <h2>9. Contact Us</h2>
       <p>
         If you have any questions or concerns about these Terms of Service, please contact us at:
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
   name: 'TermsPage',
   data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
 };
 </script>
 
 <style scoped>
 .terms-container {
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
   color: aliceblue;
 }
 
 strong {
   color: #ffffff;
 }

 @media (max-width: 768px) {
   .terms-container {
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