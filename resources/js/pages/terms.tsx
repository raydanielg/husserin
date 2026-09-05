import { LegalPage, type LegalSection } from "@/components/legal-page"

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: (
      <p>
        By accessing and using the Husserin Investment Company Limited website,
        you accept and agree to be bound by these Terms of Service. If you do
        not agree to these terms, please do not use our website or services.
      </p>
    ),
  },
  {
    heading: "2. Company Services",
    body: (
      <p>
        Husserin Investment Company Limited provides global trading, tender and
        contract supply, procurement and global sourcing, and cargo
        consolidation services. This website serves as a platform for
        enquiries, quotations, vendor registration and business communication.
        We do not operate as a consumer retail store or courier service.
      </p>
    ),
  },
  {
    heading: "3. Enquiries and Quotations",
    body: (
      <p>
        All quotations, estimates and commercial offers provided through this
        website are subject to availability, specification confirmation and
        final agreement. Submission of an RFQ, tender enquiry or consolidation
        quote request does not constitute a binding contract until a formal
        agreement is signed by authorised representatives of both parties.
      </p>
    ),
  },
  {
    heading: "4. Vendor Registration",
    body: (
      <p>
        Vendors and suppliers registering through this website acknowledge that
        registration does not guarantee approval or inclusion in our supplier
        database. Husserin Investment reserves the right to approve, reject or
        remove vendor registrations at its discretion based on compliance,
        capability and commercial suitability.
      </p>
    ),
  },
  {
    heading: "5. Intellectual Property",
    body: (
      <p>
        All content on this website, including text, graphics, logos, images
        and design elements, is the property of Husserin Investment Company
        Limited or its content suppliers and is protected by applicable
        intellectual property laws. You may not reproduce, distribute or use
        any content without prior written permission.
      </p>
    ),
  },
  {
    heading: "6. Limitation of Liability",
    body: (
      <p>
        Husserin Investment Company Limited shall not be liable for any direct,
        indirect, incidental, consequential or punitive damages arising from
        your use of or inability to use this website or services. We do not
        warrant that the website will be error-free, uninterrupted or secure.
      </p>
    ),
  },
  {
    heading: "7. Third-Party Links",
    body: (
      <p>
        This website may contain links to third-party websites. We are not
        responsible for the content, accuracy or practices of any third-party
        sites and do not endorse them. Access to third-party sites is at your
        own risk.
      </p>
    ),
  },
  {
    heading: "8. Governing Law",
    body: (
      <p>
        These Terms of Service shall be governed by and construed in accordance
        with the laws of the jurisdiction in which Husserin Investment Company
        Limited is registered. Any disputes shall be subject to the exclusive
        jurisdiction of the competent courts in that jurisdiction.
      </p>
    ),
  },
  {
    heading: "9. Changes to Terms",
    body: (
      <p>
        We reserve the right to update or modify these Terms of Service at any
        time without prior notice. Continued use of the website after changes
        constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    heading: "10. Contact",
    body: (
      <p>
        For any questions regarding these Terms of Service, please contact us
        at{" "}
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

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      description="These terms govern your use of the Husserin Investment Company Limited website and services."
      sections={sections}
      lastUpdated="September 2026"
    />
  )
}
