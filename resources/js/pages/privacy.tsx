import { LegalPage, type LegalSection } from "@/components/legal-page"

const sections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: (
      <p>
        When you submit an enquiry, register as a vendor, or interact with our
        website, we may collect: company name, contact person name, email
        address, phone number, country, business address, website, product
        categories, brand information, certifications and any additional
        details you provide in forms or communications.
      </p>
    ),
  },
  {
    heading: "2. How We Use Your Information",
    body: (
      <p>
        We use the information you provide to process enquiries, prepare
        quotations, evaluate vendor applications, communicate with you
        regarding business opportunities, comply with legal obligations and
        improve our services. We do not sell or rent your personal or company
        information to third parties.
      </p>
    ),
  },
  {
    heading: "3. Document Uploads",
    body: (
      <p>
        When you upload documents such as BOQs, specifications, tender
        documents or certifications, these are stored securely and used solely
        for the purpose of evaluating your enquiry or application. We do not
        share uploaded documents with external parties without your consent.
      </p>
    ),
  },
  {
    heading: "4. Data Security",
    body: (
      <p>
        We implement appropriate technical and organisational measures to
        protect your data against unauthorised access, alteration, disclosure
        or destruction. All data transmissions are encrypted using HTTPS.
        Access to enquiry and vendor data is restricted to authorised
        personnel only.
      </p>
    ),
  },
  {
    heading: "5. Cookies",
    body: (
      <p>
        Our website may use cookies and similar technologies to improve
        functionality, analyse traffic and enhance user experience. You can
        control cookie preferences through your browser settings. Disabling
        cookies may affect some features of the website.
      </p>
    ),
  },
  {
    heading: "6. Third-Party Services",
    body: (
      <p>
        We may use third-party services for analytics, email communication and
        website hosting. These providers may process limited data in
        accordance with their own privacy policies. We select providers that
        demonstrate appropriate data protection standards.
      </p>
    ),
  },
  {
    heading: "7. Your Rights",
    body: (
      <p>
        You have the right to request access to, correction of, or deletion of
        your personal data held by us. To exercise these rights, please contact
        us using the details provided below. We will respond to legitimate
        requests within a reasonable timeframe.
      </p>
    ),
  },
  {
    heading: "8. Data Retention",
    body: (
      <p>
        We retain enquiry and vendor data for as long as necessary to fulfil
        the purposes for which it was collected, including legal, accounting
        or reporting requirements. Data that is no longer required is securely
        deleted or anonymised.
      </p>
    ),
  },
  {
    heading: "9. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. We will notify
        users of significant changes by posting the updated policy on this
        page. Continued use of the website after changes constitutes
        acceptance of the revised policy.
      </p>
    ),
  },
  {
    heading: "10. Contact",
    body: (
      <p>
        For any questions or requests regarding this Privacy Policy or your
        personal data, please contact us at{" "}
        <a
          href="mailto:contact@hesserininvestement.com"
          className="font-medium text-primary underline underline-offset-4"
        >
          contact@hesserininvestement.com
        </a>
        .
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      description="How Husserin Investment Company Limited collects, uses and protects your information."
      sections={sections}
      lastUpdated="September 2026"
    />
  )
}
