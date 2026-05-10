export function meta() {
  return [
    { title: "Privacy Policy - Edulearn" },
    { name: "description", content: "Privacy Policy of Edulearn" },
  ];
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">Last updated: January 1, 2026</p>
      </div>

      <div className="space-y-8 text-foreground">
        {/* Introduction */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">1. Introduction</h2>
          <p className="leading-relaxed text-muted-foreground">
            Edulearn (&quot;we&quot;, &quot;us&quot;, &quot;our&quot; or
            &quot;Company&quot;) operates the edulearn.com website. This page
            informs you of our policies regarding the collection, use, and
            disclosure of personal data when you use our Service and the choices
            you have associated with that data.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            2. Information Collection and Use
          </h2>
          <p className="mb-3 leading-relaxed text-muted-foreground">
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
          <h3 className="mb-2 text-lg font-semibold">
            Types of Data Collected:
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <strong>Personal Data:</strong> Email address, name, phone number,
              address, country
            </li>
            <li>
              <strong>Usage Data:</strong> Browser type, IP address, pages
              visited, time and date of visits
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details
              processed through secure payment gateways
            </li>
            <li>
              <strong>Communication Data:</strong> Messages, feedback, and
              support requests
            </li>
          </ul>
        </section>

        {/* Use of Data */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">3. Use of Data</h2>
          <p className="leading-relaxed text-muted-foreground">
            Edulearn uses the collected data for various purposes:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
            </li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information for improving our
              Service
            </li>
            <li>To monitor the usage of our Service</li>
            <li>
              To detect, prevent and address technical issues and fraudulent
              activity
            </li>
          </ul>
        </section>

        {/* Security */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">4. Security of Data</h2>
          <p className="leading-relaxed text-muted-foreground">
            The security of your data is important to us but remember that no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee
            its absolute security.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">5. Cookies</h2>
          <p className="leading-relaxed text-muted-foreground">
            We use cookies and similar tracking technologies to track activity
            on our Service and hold certain information. Cookies are files with
            small amount of data which may include an anonymous unique
            identifier. You can instruct your browser to refuse all cookies or
            to indicate when a cookie is being sent.
          </p>
        </section>

        {/* Third Party Services */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            6. Third-Party Service Providers
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We may employ third-party companies and individuals to facilitate
            our Service, provide the Service on our behalf, perform
            Service-related services, or assist us in analyzing how our Service
            is used. These third parties have access to your Personal Data only
            to perform these tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>
        </section>

        {/* GDPR Compliance */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">7. GDPR Compliance</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you are located in the European Union (EU) or European Economic
            Area (EEA), you have certain rights regarding your personal data
            under the General Data Protection Regulation (GDPR). These include
            the right to access, rectify, or erase your personal data, and the
            right to data portability.
          </p>
        </section>

        {/* Children Privacy */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            8. Children&apos;s Privacy
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Our Service does not address anyone under the age of 18
            (&quot;Children&quot;). We do not knowingly collect personally
            identifiable information from children under 18. If we become aware
            that a child under 18 has provided us with Personal Data, we
            immediately delete such information from our servers.
          </p>
        </section>

        {/* Changes to Policy */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            9. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date at the top of this
            Privacy Policy.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:privacy@edulearn.com"
              className="text-primary hover:underline"
            >
              privacy@edulearn.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
