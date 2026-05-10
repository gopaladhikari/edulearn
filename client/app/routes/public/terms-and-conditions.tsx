export function meta() {
  return [
    { title: "Terms and Conditions - Edulearn" },
    { name: "description", content: "Terms and Conditions of Edulearn" },
  ];
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-foreground">
          Terms and Conditions
        </h1>
        <p className="text-muted-foreground">Last updated: January 1, 2026</p>
      </div>

      <div className="space-y-8 text-foreground">
        {/* Introduction */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">1. Introduction</h2>
          <p className="leading-relaxed text-muted-foreground">
            Welcome to Edulearn (&quot;Company&quot;, &quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;). These Terms and Conditions
            (&quot;Terms&quot;, &quot;Agreement&quot;) govern your use of our
            website located at edulearn.com (together with all associated sites
            linked to edulearn.com by Edulearn, and our Services), including all
            content, functionality and services offered on or through the
            website.
          </p>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">2. User Responsibilities</h2>
          <p className="mb-3 leading-relaxed text-muted-foreground">
            When you use the Edulearn platform, you agree to:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Provide accurate and complete information when registering for an
              account
            </li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the platform only for lawful purposes</li>
            <li>
              Respect intellectual property rights of all content creators
            </li>
            <li>Not engage in any form of harassment or abusive behavior</li>
            <li>
              Not attempt to gain unauthorized access to any part of the
              platform
            </li>
          </ul>
        </section>

        {/* Intellectual Property Rights */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            3. Intellectual Property Rights
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            All content on Edulearn, including but not limited to text,
            graphics, logos, images, audio clips, digital downloads, and data
            compilations, is the property of Edulearn or its content suppliers
            and is protected by international copyright laws. Your use of the
            Edulearn platform does not give you ownership of any intellectual
            property rights in Edulearn&apos;s content or materials.
          </p>
        </section>

        {/* User Content */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">4. User-Generated Content</h2>
          <p className="leading-relaxed text-muted-foreground">
            You retain all rights to any content you submit, post or display on
            or through the Edulearn platform (&quot;User Content&quot;). By
            submitting, posting, or displaying User Content, you grant Edulearn
            a worldwide, non-exclusive, royalty-free license to use, reproduce,
            adapt, publish, translate, and distribute it in any media.
          </p>
        </section>

        {/* Account Suspension */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            5. Account Suspension and Termination
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Edulearn reserves the right to suspend or terminate your account and
            access to the Services if:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>You violate any terms of this Agreement</li>
            <li>You engage in fraudulent or illegal activity</li>
            <li>You violate others&apos; rights or safety</li>
            <li>Continued provision would create liability for Edulearn</li>
          </ul>
        </section>

        {/* Disclaimer of Warranties */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            6. Disclaimer of Warranties
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            The Edulearn platform and its content are provided on an &quot;AS
            IS&quot; and &quot;AS AVAILABLE&quot; basis. Edulearn makes no
            warranties, expressed or implied, and hereby disclaims and negates
            all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            7. Limitation of Liability
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            In no event shall Edulearn, nor its directors, employees, or agents,
            be liable to you for any direct, indirect, incidental, special,
            punitive, or consequential damages whatsoever resulting from any
            loss, which by way of example includes loss of profits, loss of use,
            loss of data or other intangibles.
          </p>
        </section>

        {/* Indemnification */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">8. Indemnification</h2>
          <p className="leading-relaxed text-muted-foreground">
            You agree to indemnify, defend, and hold harmless Edulearn and its
            officers, directors, employees, agents, and third parties from and
            against any and all claims, damages, losses, costs, liabilities, and
            expenses arising out of or in connection with your use of the
            Services or your violation of these Terms.
          </p>
        </section>

        {/* Modifications */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">9. Modifications to Terms</h2>
          <p className="leading-relaxed text-muted-foreground">
            Edulearn may revise these Terms at any time without notice. By using
            the Edulearn platform, you are agreeing to be bound by the then
            current version of these Terms. Your continued use of the platform
            following any such modification constitutes your acceptance of the
            modified terms.
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">10. Governing Law</h2>
          <p className="leading-relaxed text-muted-foreground">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the United States, and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-2xl font-bold">Questions?</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:support@edulearn.com"
              className="text-primary hover:underline"
            >
              support@edulearn.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
